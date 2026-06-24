import React from 'react'
import { useState,useEffect } from 'react'
import slide1 from '../../assets/slideImage1.jpg'
import slide2 from '../../assets/slideImage2.jpg'
import slide3 from '../../assets/slideImage3.jpg'
import { ChevronLeft, ChevronRight } from 'lucide-react'

 const images =[
        slide1,
        slide2,
        slide3
    ]
const ImageSlider = () => {
   const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    const previuosSlide = () => {
        setCurrentIndex((prevIndex) => ( prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

  return (
    
    <div className=" relative w-full  h-[150px] sm:h-[220px] md:h-[300px] lg:h-[350px] object-cover  overflow-hidden shadow-lg">
       <div className ="flex flex-column w-full h-full transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
           {
            images.map((image,index)=>(
                <img src={image} key ={index}  className ="w-full h-full overflow-hidden object-cover shrink-0" />
            ))
             
           }
          
       </div>
 {/* Navigation Buttons */}
        <button onClick= { previuosSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            <ChevronLeft size={15}/>
              </button>

                <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <ChevronRight size={15}/>
                </button>
            {/* Indicators */}
                <div className ="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex cursor-pointer">
                    {images.map((_,index)=>(
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full mx-1
                        ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`}>

                        </button>

))}
                </div>
    </div>
  )
}

export default ImageSlider
