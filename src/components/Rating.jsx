import React from 'react'
import { Star } from './Star'

const Rating = ({ rating }) => {
  console.log('🚀 ~ file: Rating.jsx:5 ~ Rating ~ rating:', rating)
  return (
    <div className="stars">
      {Array.from({ length: 5 }, (_, i) => {
        return (
          <div key={i} className={parseInt(rating) > i ? 'star' : 'star-empty'}>
            <Star />
          </div>
        )
      })}
    </div>
  )
}

export default Rating
