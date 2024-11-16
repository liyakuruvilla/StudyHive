import React from 'react'
import './HomePg.css'
import ImageUpload from '../UrlUpload'

const HomePg = () => {
  return (
    <div className='home-container'>
      <h2 className='desc'>Welcome to StudyHive, a hub for you to learn more about your learning styles and meet peers with similar backgrounds!</h2>
      <ImageUpload />
    </div>
  )
}

export default HomePg
