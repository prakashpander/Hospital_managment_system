import React from 'react'

const Hero = ({ title, imageUrl }) => {
  return (
    <div className='hero container'>
      <div className='banner'>
        <h1>{title}</h1>
        <p>At Our Health Care Services, we believe that good health is the key to a happy life. Our team of doctors and specialists are here to support you with care, comfort, and expertise.</p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className='animated-image' />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  )
}

export default Hero