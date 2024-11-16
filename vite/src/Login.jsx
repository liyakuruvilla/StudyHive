import { useState, useEffect } from 'react'
import axios from 'axios'
import './Login.css'
import { useForm } from 'react-hook-form';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
   
    return (
        <div className='sign-up'>
            <div className='sign-up-card'>
                <div className='sign-up-content'>
            <h2>Log In</h2>
            <form > 
                <div className='input'>
                    {/* <label htmlFor="username">Username: </label> */}
                    <input
                    placeholder='Enter your Username'
                    id="username"
    
                    />
                </div>

                {/* <label htmlFor="password">Password: </label> */}
                <div className='input'>
                <input
                    placeholder='Enter your Password'
                    id="password"
                    
                />
                </div>
                <button type="submit" name="button" value="submit">Submit</button>
            </form>
            </div> 
            </div>
        </div>
    )
}