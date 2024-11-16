import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './navbar.css'

const SideBar = () => {
  return (
    <div className='navbar'>
        <ul className='links'>
            <li>
                <Link to='/login' className='nav-text'>
               login</Link>
               <Link to='/home' className='nav-text'>
               home</Link>
            </li>
        </ul>
      
    </div>
  )
}

export default SideBar
