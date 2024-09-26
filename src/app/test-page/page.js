import React from 'react'
import Reviews1 from '@/components/Reviews1'
import SearchResults4 from '@/components/SearchResults4'

function TestPage() {
  return (
    <div>
      <Reviews1/>
      <SearchResults4/> {/* Use this one. Hide the images on phones. */}
    </div>
  )
}

export default TestPage