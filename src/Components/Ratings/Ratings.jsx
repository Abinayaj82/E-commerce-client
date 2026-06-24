import React, { useEffect } from 'react'
import { Star } from 'lucide-react'
import { useState } from 'react'
const Ratings = ({value =0, onRatingChange,disabled=false,showValue=true}) => {
  const[hover,setHover] =useState(0)
  const[rating,setRating] =useState(value)

    const handleClick = (star) => {
    if (disabled) return;
    setRating(star);
    if (onRatingChange) onRatingChange(star);
  };
  useEffect(()=>{
     setRating(value);
  },[value]);
  
  return (
    <div className="flex items-center">
        <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) =>{
            const filled = hover ? star <= hover : star <= rating
            return(
            <Star key={star} size={20}
            onClick={()=>handleClick(star)}
            onMouseEnter={()=>!disabled && setHover(star)}
            onMouseLeave={()=> !disabled && setHover(0)}
             className={`cursor-pointer transition-colors ${
                filled ? "text-yellow-400" : "text-gray-400"
              } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
              fill={filled ? "currentColor" : "none"}
              />)
             
        })}
        </div>
        {showValue && <span className="ml-2 text-sm text-gray-600">{value}/5</span>}
      </div>
  )
}

export default Ratings
