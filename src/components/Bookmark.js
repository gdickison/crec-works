/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from "react"
import { useUser } from '@clerk/nextjs'
import { toggleBookmark, isBookmarked } from '@/app/actions'

export default function Bookmark({ listingId }) {
  const [marked, setMarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    async function checkBookmarkStatus() {
      if (user) {
        const status = await isBookmarked(user.id, listingId)
        setMarked(status)
      }
      setIsLoading(false)
    }
    checkBookmarkStatus()
  }, [user, listingId])

  async function handleClick(e) {
    e.preventDefault()
    if (!user) return

    try {
      const res = await toggleBookmark(user.id, listingId)
      if (res.message) {
        setMarked(prev => !prev)
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="p-2">
        <div className="animate-pulse bg-gray-200 rounded-full h-6 w-6"></div>
      </div>
    )
  }

  return (
    <div
      className="p-2 hover:cursor-pointer hover:text-red-500"
      onClick={handleClick}
      title={marked ? "Remove bookmark" : "Add bookmark"}
    >
      {marked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#EA3323"
        >
          <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z"/>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
          stroke="currentColor"
        >
          <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/>
        </svg>
      )}
    </div>
  )
}