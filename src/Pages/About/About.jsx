import React from 'react'
import aboutImage from '../../assets/about image.jpg';
import Footer from '../../Components/Footer/Footer';
import PageTitle from '../../Components/PageTitle';

const About = () => {
  return (
    <>
    <PageTitle title="About Us | E-Commerce" />
    <div  className="bg-[#DBE4C9] max-h-1200 flex flex-col items-center p-6">
      <h1 className="text-[#718b13] text-2xl font-bold">About us</h1>
        <img src={aboutImage} className= 'w-auto h-90 p-6 object-cover md:object-fill'></img>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae 
            pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean 
            sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
             nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
              Ad litora torquent per conubia nostra inceptos himenaeos.Lorem ipsum dolor sit amet consectetur 
              adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
               pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus 
               fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia 
                nostra inceptos himenaeos.</p>
    </div>
    <div>
        <Footer />
    </div>
    </>
  )
}

export default About
