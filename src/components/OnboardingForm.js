'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { completeOnboarding } from '@/app/actions'

export default function OnboardingForm({ churches, href }) {
  const [error, setError] = React.useState('')
  const { user } = useUser()

  const handleSubmit = async (formData) => {
    const churchValue = formData.get('church')
    const [churchName, churchId, churchCity, churchState] = churchValue.split('|')
    
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      church: churchName,
      churchId,
      churchCity,
      churchState
    }

    const res = await completeOnboarding(data)

    if (res?.message) {
      // Reloads the user's data from the Clerk API
      await user?.reload()
      window.location.href = href
    }
    if (res?.error) {
      setError(res?.error)
    }
  }

  return (
    <form action={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input 
            type="text" 
            name="firstName" 
            required 
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input 
            type="text" 
            name="lastName" 
            required 
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <label className="block text-sm font-medium text-gray-700">Church</label>
        <select 
          name="church" 
          required 
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select your church</option>
          {churches.map(church => (
            <option 
              key={church.id} 
              value={`${church.name}|${church.id}|${church.city}|${church.state}`}
            >
              {church.name} - {church.city}, {church.state}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">
          Error: {error}
        </p>
      )}
      <button 
        type="submit" 
        className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      >
        Submit
      </button>
    </form>
  )
} 