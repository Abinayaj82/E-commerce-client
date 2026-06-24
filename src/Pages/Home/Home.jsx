import React from 'react'
import ImageSlider from '../../Components/ImageSlider/ImageSlider'
import Footer from '../../Components/Footer/Footer'
import FeaturedProducts from '../../Components/FeaturedProducts/FeaturedProducts'
import Services from '../../Components/Services/Services'
import PageTitle from '../../Components/PageTitle'

const Home = () => {
  return (
   
    <div className="bg-[#DBE4C9] h-auto" >
       <PageTitle title="Home | E-Commerce" />
      <ImageSlider />
      <FeaturedProducts />
      <Services />
      <Footer />
      
    </div>
  )
}

export default Home
