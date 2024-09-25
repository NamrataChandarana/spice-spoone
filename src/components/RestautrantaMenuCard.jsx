import React, { useEffect, useState } from 'react'
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { cartSuccess } from '../redux/reducers/cartData';

const RestautrantaMenuCard = ({items}) => {

  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart)

  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart));
  },[cart])

  function handleAddBtn(item) {
    // setCartData(item);
    dispatch(cartSuccess(item));
  }
  
  return (
    <div className="flex px-3 py-9 justify-between border-t border-[.2] border-lightGray">
        <div>
            <h1 className="font-bold text-darkhead text-lg">{items?.card?.info?.name}</h1>
            {
                items?.card?.info?.finalPrice ? (
                    <div className="flex gap-1">
                        <h1 className="line-through flex text-lightGray"><MdOutlineCurrencyRupee className="mt-1 line-through text-lightGray"/>{(items?.card?.info?.defaultPrice) / 100}</h1>
                        <h1 className="flex"><MdOutlineCurrencyRupee className="mt-1"/>{(items?.card?.info?.finalPrice) / 100}</h1>
                    </div>
                 ) : (items?.card?.info?.price ? (<h1 className="flex text-darkhead font-bold"><MdOutlineCurrencyRupee className="font-bold mt-1"/>{(items?.card?.info?.price) / 100}</h1>) : (<h1 className="flex text-darkhead font-bold"><MdOutlineCurrencyRupee className="font-bold mt-1"/>{(items?.card?.info?.defaultPrice) / 100}</h1>))
            }
        {
            items?.card?.info?.ratings?.aggregatedRating?.rating ? (
                <div className="flex" >
                    <FaStar className="text-green-600 mt-1 mr-1 text-sm" />
                    <span className="font-bold text-sm mt-[.10rem] text-green-600">{items?.card?.info?.ratings?.aggregatedRating?.rating}</span>
                    <span className="font-bold text-sm mt-[.10rem]">({items?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</span>
                </div>
            ) : null
        }
        <p className="w-[37rem] text-md text-lightGray">{items.card?.info?.description}</p>
        </div>
        <div className="relative w-[156px] h-[144px] overflow-hidden z-10 rounded-md">
            <img className="z-10 absolute top-0 left-0 w-full h-full object-cover" loading="lazy" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${items?.card?.info?.imageId}`} alt="" />

        </div>
        <div className="relative  z-10">
            <button className="bg-white absolute right-[4.5rem] top-[7rem] text-green-600 px-9 py-2 font-bold rounded-md border border-black" onClick={() => handleAddBtn(items)}>ADD</button>
        </div>
    </div>
  )
}

export default RestautrantaMenuCard;