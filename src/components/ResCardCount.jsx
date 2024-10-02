import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cartItemsCountSuccess, cartItemsTotalSuccess } from '../redux/reducers/cartData';

const ResCardCount = ({items, className}) => {
  const cartQun = JSON.parse(localStorage.getItem('cartQuantity'))
  const dispatch = useDispatch();

 
  function incrementBtn(){
    const updatedData =  cartQun?.map((item)=>{
      if(items?.card?.info?.id === item?.id ){ 
        return { ...item, quantity: item?.quantity < 10 ? item?.quantity + 1 : item?.quantity };
      }
      return item;
    })
    localStorage.setItem('cartQuantity', JSON.stringify(updatedData))
    dispatch(cartItemsCountSuccess(updatedData))
    
    // dispatch(cartItemsTotalSuccess(updatedData))
  }

  function decrementBtn(){
    const updatedData = cartQun.map((item)=>{
      if(items?.card?.info?.id === item?.id ){ 
        return { ...item, quantity: item?.quantity > 1 ? item?.quantity - 1 : 1 };
      }
      return item;
    })
    localStorage.setItem('cartQuantity', JSON.stringify(updatedData))
    dispatch(cartItemsCountSuccess(updatedData))
  }
  return (

    // <div className="relative flex z-0">
      <div className={`${className} border border-lightBlue rounded-md py-2 px-4`}>
        <button className=' z-20 text-green-600 font-bold ' onClick={decrementBtn}>-</button>
          {
            cartQun?.length > 0 && cartQun?.map((item) => (
              (item?.id === items?.card?.info?.id) ? (
                <button className='bg-white text-green-600 px-3 font-bold '>
                  {item?.quantity}
                </button>
              ):null
            ))
          }
        <button onClick={incrementBtn} className=' z-20 text-green-600 font-bold '>+</button>
      </div>
        
    // </div>    

  )
}

export default ResCardCount;