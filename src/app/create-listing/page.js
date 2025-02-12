'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { categoryOptions } from '@/utils/listingOptions';
import { useUser } from "@clerk/nextjs";
import { uploadListingImage, createListing } from './actions';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function CreateListing() {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [addressDetails, setAddressDetails] = useState(null);
  const selectId = 'service-categories';
  const { user, isLoaded } = useUser();
  // console.log(user);
  const GoogleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const router = useRouter();

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    };

    const initAutocomplete = () => {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: ['us'] }
      });

      autocompleteRef.current.addListener('place_changed', handlePlaceChange);
    };

    loadGoogleMapsScript();

  }, [GoogleApiKey]);

  const handlePlaceChange = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) {
      setAddressDetails(null);
      return;
    }

    let streetNumber = '';
    let route = '';
    let locality = '';
    let administrativeAreaLevel1 = '';
    let country = '';
    let postalCode = '';

    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case 'street_number':
          streetNumber = component.long_name;
          break;
        case 'route':
          route = component.long_name;
          break;
        case 'locality':
          locality = component.long_name;
          break;
        case 'administrative_area_level_1':
          administrativeAreaLevel1 = component.short_name;
          break;
        case 'country':
          country = component.long_name;
          break;
        case 'postal_code':
          postalCode = component.long_name;
          break;
      }
    }

    const address = `${streetNumber} ${route}, ${locality}, ${administrativeAreaLevel1} ${postalCode}, ${country}`;

    setAddressDetails({
      fullAddress: address,
      street: `${streetNumber} ${route}`,
      city: locality,
      state: administrativeAreaLevel1,
      country,
      postalCode,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    });
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset
  } = useForm({
    defaultValues: {
      categories: [],
      owner_name: isLoaded ? `${user?.fullName}` : '',
      owner_role: '',
      business_email: isLoaded ? `${user?.primaryEmailAddress.emailAddress}` : '',
      business_phone: '',
      authority: false
    }
  });

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const onSubmit = async (data) => {
    try {
      // Handle avatar upload first if there is one
      let imageFile = data.imageFile || null
      if (data.imageFile && data.imageFile instanceof FileList && data.imageFile.length > 0) {
        const file = data.imageFile[0]
        // Convert File to ArrayBuffer, then to Base64
        const buffer = await file.arrayBuffer()
        const base64 = Buffer.from(buffer).toString('base64')

        // Create a serializable object with the file data
        const fileData = {
          name: file.name,
          type: file.type,
          base64: base64
        }
        imageFile = await uploadListingImage(fileData)
      }

      const formData = {
        ...data,
        created_date: new Date().toISOString(),
        location: addressDetails,
        userId: user.id,
        imageFile: imageFile
      };

      await createListing(formData);
      document.getElementById('listing_submission_success').showModal()
      reset() // Reset the form fields
      // Add a slight delay to show the success modal before redirecting
      setTimeout(() => {
        document.getElementById('listing_submission_success').close();
        router.push('/'); // Redirect to home page
      }, 2000); // 2 second delay
    } catch (error) {
      console.error('Error creating listing:', error);
      document.getElementById('listing_submission_error').showModal()
    }
  };

  const inputClassName = "mt-2 block w-full rounded-md border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#4e02e4] sm:text-medium sm:leading-6 bg-gray-100 text-sm placeholder:text-sm";

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="pt-20 w-full">
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Create New Business Listing</h1>
          <p className="text-sm text-gray-500 mb-6">Listings are for your personal services. You may list your own business, or your services within a larger organization. For example, if you are a financial advisor, you may list your services under your own business name, or under the name of the organization you work for.</p>
          <p className="text-sm text-gray-500 mb-6">Please fill out the form below to provide the information that will appear in your new business listing. All fields are required.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-md font-medium mb-1">Business Name</label>
                <input
                  {...register('business_name', { required: 'Title is required' })}
                  className={inputClassName}
                />
                {errors.business_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.business_name.message}</p>
                )}
              </div>

              <div>
                <label className="block sm:col-span-6 text-md font-medium leading-6 text-gray-900">
                  Physical Address
                  <p className="text-sm text-gray-500 mt-3">Your physical address will not be shown on the listing, but will be used in search results and to show your service area.</p>
                  <input
                    ref={inputRef}
                    type="text"
                    className={inputClassName}
                    placeholder="Physical Address (No PO Boxes)"
                  />
                </label>
                {addressDetails && (
                  <div className="bg-gray-100 p-4 rounded sm:col-span-6">
                    <h2 className="text-2xl font-semibold mb-2">Address Details:</h2>
                    <p><strong>Full Address:</strong> {addressDetails.fullAddress}</p>
                    <p><strong>Street:</strong> {addressDetails.street}</p>
                    <p><strong>City:</strong> {addressDetails.city}</p>
                    <p><strong>State:</strong> {addressDetails.state}</p>
                    <p><strong>Country:</strong> {addressDetails.country}</p>
                    <p><strong>Postal Code:</strong> {addressDetails.postalCode}</p>
                    <p><strong>Latitude:</strong> {addressDetails.latitude}</p>
                    <p><strong>Longitude:</strong> {addressDetails.longitude}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-md font-medium mb-1">Website URL</label>
                <input
                  {...register('website_url', { required: 'URL slug is required' })}
                  className={inputClassName}
                />
                {errors.website_url && (
                  <p className="text-red-500 text-sm mt-1">{errors.website_url.message}</p>
                )}
              </div>

              <div>
                <label className="block text-md font-medium mb-1">Description</label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  className={inputClassName}
                  rows={4}
                  placeholder="Only the first 250 characters will be shown on the listing. The full description will be shown on the listing page."
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{watch('description')?.length || 0} characters</span>
                  <span>First 250 shown on listing</span>
                </div>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-md font-medium mb-1">Business Logo or Image</label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.svg"
                  {...register('imageFile', {
                    required: 'Image is required',
                    validate: {
                      lessThan1MB: (files) =>
                        !files[0] || files[0].size <= 1000000 || 'Image must be less than 1MB',
                      acceptedFormats: (files) =>
                        !files[0] ||
                        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'].includes(files[0]?.type) ||
                        'Only JPG, JPEG, PNG, WEBP and SVG files are allowed'
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-md text-sm
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100`}
                />
                {errors.imageFile && (
                  <p className="text-red-500 text-sm mt-1">{errors.imageFile.message}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">
                  Maximum file size: 1MB. Accepted formats: JPG, JPEG, PNG, WEBP, SVG
                </p>
              </div>

              <div>
                <label className="block text-md font-medium mb-2">Service Categories:</label>
                <p className="text-gray-500 text-sm mb-1">
                  Select one or more categories that best describe your business.
                </p>
                <Controller
                  name="categories"
                  control={control}
                  rules={{
                    required: 'Select at least one category',
                    validate: value => !value || value.length <= 3 || 'Maximum 3 categories allowed'
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      isMulti
                      options={categoryOptions}
                      value={categoryOptions.filter(option =>
                        value?.some(cat => cat.value === option.value)
                      )}
                      onChange={(selected) => {
                        onChange(selected?.map(item => ({
                          value: item.value,
                          label: item.label,
                          href: item.href
                        })));
                      }}
                      className="w-full"
                      instanceId={selectId}
                    />
                  )}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div>
              {console.log('isLoaded', isLoaded)}
              {console.log('user', user)}
                <label className="block text-md font-medium mb-1">Your Name</label>
                <input
                  {...register('owner_name', { required: 'Owner name is required' })}
                  className={inputClassName}
                />
                {errors.owner_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.owner_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-md font-medium mb-1">Your Role</label>
                <p className="text-gray-500 text-sm mt-1">
                  Enter the role, title, or certification that best describes you.
                </p>
                <input
                  {...register('owner_role', { required: 'Owner role is required' })}
                  className={inputClassName}
                  placeholder="e.g. Owner, Founder, CEO, Senior Advisor, etc."
                />
                {errors.owner_role && (
                  <p className="text-red-500 text-sm mt-1">{errors.owner_role.message}</p>
                )}
              </div>
              <div>
                <label className="block text-md font-medium mb-1">Business Email</label>
                <input
                  {...register('business_email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  className={inputClassName}
                />
                {errors.business_email && (
                  <p className="text-red-500 text-sm mt-1">{errors.business_email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-md font-medium mb-1">Business Phone</label>
                <Controller
                  name="business_phone"
                  control={control}
                  rules={{
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\(\d{3}\) \d{3}-\d{4}$/,
                      message: 'Invalid phone number format'
                    }
                  }}
                  render={({ field: { onChange, value } }) => (
                    <input
                      value={value}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        onChange(formatted);
                      }}
                      placeholder="(555) 555-5555"
                      className={inputClassName}
                    />
                  )}
                />
                {errors.business_phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.business_phone.message}</p>
                )}
              </div>
              <div>
                <input
                  type="checkbox"
                  id="authority"
                  defaultChecked={false}
                  {...register('authority', {
                    required: 'You must confirm you have authority to post this listing'
                  })}
                />
                <label htmlFor="authority" className="ml-2">
                  I am an owner of this business or the provider of the services listed, and a member in good standing of a member church, and I have authority to post this listing.
                </label>
                {errors.authority && (
                  <p className="text-red-500 text-sm mt-1">{errors.authority.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Listing
            </button>
            <dialog id='listing_submission_success' className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto">
              <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="bg-white relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Course Submitted Successfully</h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">Your listing has been submitted successfully.</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => document.getElementById('listing_submission_success').close()}>
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </dialog>
            <dialog id='listing_submission_error' className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto">
              <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="bg-white relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Error Submitting Course</h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">There was an error submitting your listing. Please try again.</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => document.getElementById('listing_submission_error').close()}>
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </dialog>
          </form>
        </div>
      </section>
    </div>
  )
}
