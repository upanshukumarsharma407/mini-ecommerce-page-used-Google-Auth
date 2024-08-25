import React, { useContext, useEffect, useState } from 'react'
import Header from '../commen/Header'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../FirebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cartContex } from '../context/MainContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  let {userToken,setUserToken}=useContext(cartContex)
  

  const auth = getAuth(app)
  let navigate = useNavigate()

  let registerData = (e)=>{
    e.preventDefault()
    toast.success('User Creating')
    let email = e.target.email.value
    let password = e.target.password.value

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        //console.log(user)
        console.log(user)
        setUserToken(user)
        navigate('/login')

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }

  

  return (
    <>
      <div className=' sticky top-0 z-[999]'>
        <Header/>
      </div>
      <div>
        <div className="container mx-auto">
          <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded border">
                <div className="py-4 px-8 text-black text-xl font-bold border-b border-grey-lighter capitalize">Register for a free account</div>
                <form onSubmit={registerData} className="py-4 px-8">
                    
                    <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2" for="email">Email Address</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="email" placeholder="Your email address" name='email'/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2" for="password">Password</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="password" type="password" placeholder="Your secure password" name='password'/>
                        <p className="text-grey text-xs mt-1">At least 6 characters</p>
                    </div>
                    <div className="flex items-center justify-between mt-8">
                        <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full" type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
            <p className="text-center my-4">
                <a href="#" className="text-grey-dark text-sm no-underline hover:text-grey-darker">I already have an account</a>
            </p>
        </div>
        <footer className="w-full bg-grey-lighter py-8">
          <div className="container mx-auto text-center px-8">
              <p className="text-grey-dark mb-2 text-sm">This is a product of <span className="font-bold">Your Company</span></p>
          </div>
        </footer>
      </div>
      <ToastContainer position="top-center"/>
    </>
  )
}
