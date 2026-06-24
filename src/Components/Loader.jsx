import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className ="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">
      <span className="sr-only">Loading</span>
      </div>

    </div>
  )
}

export default Loader
