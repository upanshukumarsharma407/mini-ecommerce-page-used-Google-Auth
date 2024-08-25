import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';

export let cartContex = createContext()

export default function MainContext({children}) {

  const tokenValu = Cookies.get('token')

    let [productData,setProductData]=useState([])
    let [cart,setCart]=useState(JSON.parse(localStorage.getItem('cart2')) ?? [])
    let [token,setToken]=useState(tokenValu ?? "")
    let [userToken,setUserToken]=useState("")

    let obj={productData,setProductData,cart,setCart,token,setToken,userToken,setUserToken}

    let apiDataFetch = ()=>{
      axios.get('https://dummyjson.com/products')
      .then((res)=>{
        let products=res.data.products
        setProductData(products)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  
    useEffect(()=>{
      apiDataFetch()
    },[])

    useEffect(()=>{
        localStorage.setItem('cart2',JSON.stringify(cart))
    },[cart])

    useEffect(()=>{
      Cookies.set('token',token);
    },[token])

  return (
    <cartContex.Provider value={obj}>
        {children}
    </cartContex.Provider>
  )
}
