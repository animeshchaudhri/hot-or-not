import Link from 'next/link'
import React from 'react'

function Button() {
  return (
    <Link href="/delete-request">
      <button
        className="bg-primary text-white rounded-md px-3 py-1 text-sm"
      >
        Request Deletion
      </button>
    </Link>
  )
}

export default Button