import React from 'react'

const Footer = () => {
  return (
     <div className="bg-[#8AA624] text-center py-4 text-sm md:text-lg lg:text-xl ">
      <p>&copy; {new Date().getFullYear()} Freshkart. All rights reserved.</p>
      <p>
        <a href="/">Privacy Policy</a> | 
        <a href="/"> Terms of Service</a>
      </p>
    </div>
  )
}

export default Footer
