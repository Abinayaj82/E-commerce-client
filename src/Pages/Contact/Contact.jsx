import React from 'react'
import Footer from '../../Components/Footer/Footer';
import PageTitle from '../../Components/PageTitle';

const Contact = () => {
  return (
    <>
      <PageTitle title={'Contact us | E-Commerce'} />
    <div className="bg-[#DBE4C9] max-h-1200 flex flex-col items-center  p-8">
      <h1 className='text-[#718b13] text-2xl font-bold'>Contact us</h1>
      <p className='p-5 font-light'>If you have any questions, feel free to ask us</p>
      <form className='flex flex-col gap-4  shadow-lg/20 p-4 bg-white rounded'>
      <div className='p-2 flex flex-col '>
        <div className='p-0 flex flex-col sm:flex-row gap-1 sm:gap-4'>
             <div className='p-2 flex flex-col gap-2 '>
          <label htmlFor="name" className='font-light '>First Name</label>
          <input type="text" id="name" name="name"  className="border-2 border-[#78C841] focus:border-pink-600 w-60 rounded-md"  required />
        </div>
            <div className='p-2 flex flex-col gap-2'>
          <label htmlFor="name" className='font-light '> Last Name</label>
          <input type="text" id="name" name="name"  className="border-2 border-[#78C841] focus:border-pink-600 w-60 rounded-md"  required />
        </div>
        </div>
        <div className='p-0 flex flex-col sm:flex-row gap-1 sm:gap-4'>
        <div className='p-2 flex flex-col gap-2'>
          <label htmlFor="email" className='font-light '>Email</label>
          <input type="email" id="email" name="email" className="border-2 border-[#78C841] focus:border-white-600 w-60 rounded-md" required />
        </div>
         <div className='p-2 flex flex-col gap-2'>
          <label htmlFor="number"className='font-light '>Phone number</label>
          <input type="number" id="number" name="number" className="border-2 border-[#78C841] focus:border-pink-600 w-60 rounded-md" required />
        </div>
        </div>
        <div  className='p-2 flex flex-col gap-2'>
            <label htmlFor="message" className='font-light '>Message</label>
          <textarea id="message" name="message" required className="border-2 border-[#78C841] focus:border-pink-600 w-60 h-35 sm:w-130 md:h-90 rounded-md "></textarea>
          </div>
        </div>
        <div className='p-2 flex justify-center'>
        <button type="submit" className='cursor-pointer bg-[#78C841] w-30 p-2 rounded-md text-white '>Send Message</button>
        </div>
      </form>
     
    </div>
     <div className='w-full'>
        <Footer />
      </div>
      </>
  )
}

export default Contact
