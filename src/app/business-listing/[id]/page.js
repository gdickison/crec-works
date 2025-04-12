import React from 'react'
import Reviews1 from '@/components/Reviews1'

async function TestPage(props) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  return (
    <div>
      <h1>{searchParams.name}</h1>
      <h2>{params.id}</h2>
      <Reviews1/>
    </div>
  )
}

export default TestPage