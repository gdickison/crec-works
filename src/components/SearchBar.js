'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { usePathname } from 'next/navigation'

function SearchBar({ setResults }) {
  const [input, setInput] = useState(undefined)
  const pathname = usePathname()

  const fetchData = (value) => {
    const searchTerms = value.split(' ')
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(res => res.json())
      .then(json => {
        const results = json.filter(obj => {
          return searchTerms.every(term => {
            return obj.title.toLowerCase().includes(term.toLowerCase())
          })
        })
        setResults(results)
      })
  }

  const handleChange = (value) => {
    setInput(value)
    value.length > 0 ? fetchData(value) : setResults([])
  }

  return (
    <div>
      <div className="flex items-center m-auto h-14 bg-white rounded-3xl w-11/12 md:w-3/4 lg:w-1/2">        
        <div className = "w-11/12 mx-auto flex items-center">
          <input
            type="text"
            className="p-2 w-full border-0 text-base font-normal focus:outline-none"
            id="search_text"
            placeholder={pathname === '/' ? "Search public listings" : "Search by name or keyword"}
            value={input}
            onChange={e => handleChange(e.target.value)}
          />
          <img src="/images/search.svg" className="h-6 w-6 md:h-8 md:w-8 text-[#5E6573]"/>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
