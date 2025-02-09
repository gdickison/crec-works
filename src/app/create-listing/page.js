'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import("react-select"), { ssr: false });

const categoryOptions = [
  { value: 'restaurants', label: 'Restaurants', href: '/categories/restaurants' },
  { value: 'retail', label: 'Retail', href: '/categories/retail' },
  { value: 'services', label: 'Services', href: '/categories/services' },
  // Add more categories as needed
];

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
  } = useForm({
    defaultValues: {
      categories: [],
      author: {
        name: '',
        role: '',
        href: '',
        imageUrl: ''
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

  const inputClassName = "mt-2 block w-full rounded-md border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#4e02e4] sm:text-medium sm:leading-6 bg-gray-100";

  return (
    <div className="pt-20 w-full">
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Create New Business Listing</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Business Name</label>
                <input
                  {...register('business_name', { required: 'Title is required' })}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.business_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.business_name.message}</p>
                )}
              </div>

              <div>
                <label className="block sm:col-span-6 font-medium leading-6 text-gray-900">
                  Physical Address
                  <input
                    ref={inputRef}
                    type="text"
                    className={inputClassName}
                    // placeholder="What you enter in to Google Maps to find your ranch"
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
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.website_url && (
                  <p className="text-red-500 text-sm mt-1">{errors.website_url.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={4}
                />
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
                  className="w-full px-3 py-2 border rounded-md"
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

            {/* Author Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Author Information</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  {...register('author.name', { required: 'Author name is required' })}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.author?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.author.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  {...register('author.role', { required: 'Author role is required' })}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.author?.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.author.role.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Author URL</label>
                <input
                  {...register('author.href', { required: 'Author URL is required' })}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.author?.href && (
                  <p className="text-red-500 text-sm mt-1">{errors.author.href.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Author Image URL</label>
                <input
                  {...register('author.imageUrl', {
                    required: 'Author image URL is required',
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Must be a valid URL'
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.author?.imageUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.author.imageUrl.message}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
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
                  className="w-full px-3 py-2 border rounded-md"
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
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <input
                  {...register('website', {
                    required: 'Website is required',
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Must be a valid URL'
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
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
