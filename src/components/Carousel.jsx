import React from 'react'
import '../styles/carousel.scss'
import { Chevron } from './Chevron'

const Carousel = ({ images }) => {
  console.log('🚀 ~ file: Carousel.jsx:6 ~ Carousel ~ images:', images)
  const [currentImage, setCurrentImage] = React.useState(0)

  const handleNext = () => {
    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1)
    } else {
      setCurrentImage(0)
    }
  }

  const handlePrev = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1)
    } else {
      setCurrentImage(images.length - 1)
    }
  }

  return (
    <div className="carousel">
      <div className="carousel_image">
        <img src={images[currentImage]} alt="images of apartments" />
      </div>
      <div className="image_counter">{currentImage + 1} / {images.length}</div>
      {images.length > 1 && (
        <button onClick={handlePrev} type="button" className="left">
          <Chevron />
        </button>
      )}
      {images.length > 1 && (
        <button onClick={handleNext} type="button" className="right">
          <Chevron />
        </button>
      )}
    </div>
  )
}

export default Carousel
