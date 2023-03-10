import React from 'react'
import '../styles/carousel.scss'
import { Chevron } from './Chevron'

const Carousel = ({ images }) => {
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
      <button onClick={handlePrev} type="button" className="left">
        <Chevron />
      </button>
      <button onClick={handleNext} type="button" className="right">
        <Chevron />
      </button>
    </div>
  )
}

export default Carousel
