'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { categoryOptions } from '@/utils/categories';

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function CreateListing() {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [addressDetails, setAddressDetails] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const GoogleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

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
    watch
  } = useForm({
    defaultValues: {
      categories: [],
      owner: {
        name: '',
        role: '',
        email: '',
        phone: '',
        authority: false
      }
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
      const formData = {
        ...data,
        created_date: new Date().toISOString(),
      };

      console.log('Form submitted:', formData);
      // TODO: Add your API call here
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  const inputClassName = "mt-2 block w-full rounded-md border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#4e02e4] sm:text-medium sm:leading-6 bg-gray-100 text-sm placeholder:text-sm";

  return (
    <div className="pt-20 w-full">
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Create New Business Listing</h1>
          <p className="text-sm text-gray-500 mb-6">Please fill out the form below to provide the information that will appear in your new business listing. All fields are required.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Business Name</label>
                <input
                  {...register('business_name', { required: 'Title is required' })}
                  className={inputClassName}
                />
                {errors.business_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.business_name.message}</p>
                )}
              </div>

              <div>
                <label className="block sm:col-span-6 font-medium leading-6 text-gray-900">
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
                <label className="block text-sm font-medium mb-1">Website URL</label>
                <input
                  {...register('website_url', { required: 'URL slug is required' })}
                  className={inputClassName}
                />
                {errors.website_url && (
                  <p className="text-red-500 text-sm mt-1">{errors.website_url.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
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
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  {...register('imageUrl', {
                    required: 'Image URL is required',
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Must be a valid URL'
                    }
                  })}
                  className={inputClassName}
                />
                {errors.imageUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Select Options:</label>
                <Select
                  isMulti
                  options={categoryOptions}
                  value={selectedOptions}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  {...register('owner.name', { required: 'Owner name is required' })}
                  className={inputClassName}
                />
                {errors.owner?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.owner.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  {...register('owner.role', { required: 'Owner role is required' })}
                  className={inputClassName}
                />
                {errors.owner?.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.owner.role.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  className={inputClassName}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Controller
                  name="phone"
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
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
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
                  I am the owner or principal of this business and I have authority to post this listing
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
          </form>
        </div>
      </section>
    </div>
  )
}
