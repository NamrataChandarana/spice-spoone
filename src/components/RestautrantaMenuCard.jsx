import React, { useEffect, useState } from 'react'
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { cartClearSuccess, cartItemsTotalSuccess, cartLengthSuccess, cartRemoveSuccess,cartItemsCountSuccess, cartResSuccess, cartRestautrantSuccess, cartSuccess } from '../redux/reducers/cartData';
import ResCardCount from './ResCardCount';
import { handleClearBtn } from '../utils/functions';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const RestautrantaMenuCard = ({items, restaurantId}) => {
  const dispatch = useDispatch();
  const {cart, cartItemsCount, cartRes} = useSelector((state) => state.cart)
  const [isAddBtn, setIsAddBtn] = useState(false);
  let cartQuan = JSON.parse(localStorage.getItem("cartQuantity"))
  const restautrantData =  useRestaurantMenu(restaurantId)
  const resInfo = restautrantData && restautrantData?.find((item) => (
      item?.card?.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant" ? (item) : null
  ))

  useEffect(()=>{
    if (cart && cart?.length > 0) 
        localStorage.setItem("cart", JSON.stringify(cart));
    
    const updatedCount = cart?.map((item) => {
        const matchingCartItem = cartQuan && cartQuan?.find((cartItem) => cartItem?.id === item?.card?.info?.id);
        return {
            id: item?.card?.info?.id,
            price: (item?.card?.info?.finalPrice) ?  (item?.card?.info?.finalPrice / 100) : (item?.card?.info?.price / 100) || (item?.card?.info?.defaultPrice / 100),
            quantity: matchingCartItem?.quantity || 1
        }
    }); 
    dispatch(cartItemsCountSuccess(updatedCount));

    if (cart && cart?.length >= 0) {
        localStorage.setItem("cartQuantity", JSON.stringify(updatedCount));
    }

    cartQuan?.length > 0 && cartQuan?.map((item) => {
        (item?.id === items?.card?.info?.id) ? setIsAddBtn(true) : null 
    });
  },[cart])

  useEffect(() => {
    const resData = resInfo?.card?.card?.info;
    dispatch(cartRestautrantSuccess(resData))
    localStorage.setItem("cartRes" , JSON.stringify(resData)); 
  },[restautrantData])

  function getItem(item, restaurantId ) {
    dispatch(cartResSuccess(restaurantId))
    dispatch(cartSuccess(item));
    setIsAddBtn(true);
    const length = cartQuan ? cartQuan.length + 1 : 1;
    dispatch(cartLengthSuccess(length))
    toast.success("1 item added to cart!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        // transition: Slide,
      });
  }

  function handleAddBtn(item, restaurantId, dispatch){
    if(cartRes && cartRes === null){
        getItem(item, restaurantId)
    }else{
        if(cartRes && cartRes === restaurantId){
            getItem(item, restaurantId);
            
        }else{
            dispatch(cartClearSuccess());
            localStorage.setItem('cart', JSON.stringify([]));
            dispatch(cartLengthSuccess(0))
            cartQuan = localStorage.setItem('cartQuantity', JSON.stringify([]))
            localStorage.setItem('cartRes', JSON.stringify([]))
            dispatch(cartItemsTotalSuccess(0))
            getItem(item, restaurantId)
        }
  }
  
  }

  return (
    <div className="flex gap-2 px-3 py-9 justify-between border-t border-[.2] border-gray-300">
        <div>
            <h1 className="font-bold text-darkhead text-xs sm:text-sm md:text-lg">{items?.card?.info?.name}</h1>
            {
                items?.card?.info?.finalPrice ? (
                    <div className="flex gap-1 text-sm sm:text-md md:text-lg">
                        <h1 className="line-through flex text-lightGray"><MdOutlineCurrencyRupee className="mt-1 line-through text-lightGray"/>{(items?.card?.info?.defaultPrice) / 100}</h1>
                        <h1 className="flex"><MdOutlineCurrencyRupee className="mt-1"/>{(items?.card?.info?.finalPrice) / 100}</h1>
                    </div>
                 ) : (items?.card?.info?.price ? (<h1 className="flex  text-sm sm:text-md md:text-lg text-darkhead font-bold"><MdOutlineCurrencyRupee className="font-bold mt-1"/>{(items?.card?.info?.price) / 100}</h1>) : (<h1 className="flex text-darkhead font-bold"><MdOutlineCurrencyRupee className="font-bold mt-1"/>{(items?.card?.info?.defaultPrice) / 100}</h1>))
            }
            {
                items?.card?.info?.ratings?.aggregatedRating?.rating ? (
                    <div className="flex " >
                        <FaStar className="text-green-600 mt-1 mr-1" />
                        <span className="font-bold text-xs md:text-sm mt-[.10rem] text-green-600">{items?.card?.info?.ratings?.aggregatedRating?.rating}</span>
                        <span className="font-bold text-xs md:text-sm mt-[.10rem]">({items?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</span>
                    </div>
                ) : null
            }
        <p className="sm:max-w-auto md:max-w-auto lg:max-w-[35rem] sm:text-sm md:text-md text-lightGray hidden sm:flex">{items.card?.info?.description}</p>
        </div>
        <div className="relative ">
            <div className="relative w-[100px] h-[80px] md:w-[156px] md:h-[144px] overflow-hidden rounded-md">
                <img className=" absolute top-0 left-0 w-full h-full object-cover" loading="lazy" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${items?.card?.info?.imageId}`} alt="" />
            </div>
            <div className="">
                {(isAddBtn) ? (<ResCardCount items={items} className={"absolute right-[1rem] top-[4rem] md:right-[1.5rem] md:top-[8rem]"} />) : (<button className="bg-white absolute right-[.5rem] top-[4rem]  md:right-[1.5rem] md:top-[8rem] text-green-600 px-5 py-1 md:px-9 md:py-2 font-bold rounded-md border border-black" onClick={() => handleAddBtn(items, restaurantId, dispatch)}>ADD</button>)}
            </div>
        </div>
        
    </div>
  )
}

export default RestautrantaMenuCard;