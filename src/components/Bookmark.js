/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from "react"

export default function Bookmark () {
  const [marked, setMarked] = useState(false)
  function handleClick (e) {
    e.preventDefault()
    setMarked(marked => !marked)
  }

  return (
    <div className="p-2" onClick={handleClick}>
      <img src={`${marked ? '/icons/bookmark_marked.svg' : '/icons/bookmark_unmarked.svg'}`} alt="bookmark" />
    </div>
  )
}