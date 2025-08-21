import React from 'react'

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="aboutImage" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          We are a passionate team dedicated to creating meaningful digital experiences that inspire, educate, 
          and empower people across the world.
        </p>
        <p>
          Our journey started with a simple vision - to combine creativity and technology in a way that 
          makes everyday life easier and more impactful.
        </p>
        <p>
          Over the years, we have worked with individuals, startups, and organizations, helping them bring 
          their ideas to life with innovation and care.
        </p>
        <p>
          What sets us apart is our belief in building not just projects, but long-lasting relationships 
          based on trust, transparency, and shared success.
        </p>
        <p>
          This is who we are, and this is just the beginning of our story.
        </p>
      </div>
    </div>
  )
}

export default Biography
