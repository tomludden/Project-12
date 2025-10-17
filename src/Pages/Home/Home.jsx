import './Home.css'
import React from 'react'

const Home = () => {
  return (
    <div className='home'>
      <h1>Welcome Dog Lovers!</h1>
      <img
        className='home-img'
        src='/assets/home-dog-image.jpg'
        alt='Cute Dog'
      />
    </div>
  )
}

export default Home
