import  React,{useEffect, useState} from "react";
import usegetLoacationData from "../utils/usegetLocationData";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { cardFilters } from "../utils/constant";
import { removeFilter, filterClicked, throttling } from "../utils/functions";
import RestautrantsCard from "../components/RestautrantsCard";
import useRestaurantData from "../utils/useRestaurantData";
import FilterSkeleton from "../components/skeleton/FilterSkeleton";
import image from '/location_unserviceable.avif';
import TopRated from "../components/TopRated";
import HomeSkeleton from "../components/skeleton/HomeSkeleton";
import HeroSection from "../components/HeroSection";
import useHandleScroll from "../utils/useHandleScroll";

const Home = () =>{
    const {location} = useSelector(state => state.location);
    const [locationService, setLocationService] = useState(true);
    const [isClickedIndex, setIsClickedIndex] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [topRestaurant, setTopRestaurant] = useState(null);
    const [visibleCard, setVisibleCard] = useState(null);
    const restaurantsData = useRestaurantData(setLocationService, setFilteredData, setVisibleCard);
    const TopRatedComp = TopRated(RestautrantsCard);
    useHandleScroll(filteredData,setVisibleCard);

    return (    
        <>
            <HeroSection/>
            {
                locationService ? (
                    <div className="mx-5 xs:mx-10 sm:mx-20 lg:mx-36">
                        <div>
                            <h1 className="font-bold text-xl md:text-xl  my-5">Restaurants with online food delivery in {location}</h1>
                            <div>
                                <div className="flex gap-2 overflow-y-scroll scroll-smooth custom-scroll ">
                                    {cardFilters.length > 0 ? (
                                        cardFilters.map((filter, index) => (
                                            <div className={`flex border text-sm h-8 w-auto border-darkGray px-4 py-1 mb-3 rounded-3xl gap-1 cursor-pointer text-darkGray font-semibold ${isClickedIndex === index ? "bg-[#F0F0F5]" : ""}`} 
                                                onClick={() => {
                                                    index === isClickedIndex ? removeFilter(setVisibleCard, restaurantsData) : filter.function(setVisibleCard, restaurantsData);
                                                    filterClicked(index, setIsClickedIndex, isClickedIndex);
                                                }
                                            } >
                                                <h6 className="text-nowrap">{filter?.name}</h6>
                                                <button className={`${isClickedIndex === index ? "" : "hidden"}`}><MdClose /></button>
                                            </div>
                                        ))
                                    ) : <FilterSkeleton />
                                    }
                               </div>
                            </div>
                            <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-3 ">
                                {visibleCard ? (
                                    visibleCard.length > 0 ? (
                                        visibleCard.map((restaurant) => (  
                                            (restaurant.info.avgRating >= 4.5) ? <TopRatedComp restaurant={restaurant} /> : <RestautrantsCard restaurant={restaurant} />
                                        ))   
                                    ): (
                                        <h1 className="font-bold text-center flex justify-center">Restautrant not available!</h1>
                                    )):(
                                    <HomeSkeleton length={5} />  
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-col text-center place-content-center min-h-[80vh]">
                        <img src={image} alt="img"  className="mx-auto w-64"/>
                        <h1 className="font-bold text-xl">Location Unserviceable</h1>
                        <p>We don’t have any services here till now. Try changing location.</p>
                    </div>
                )
            }
        </>
    ) 
}   

export default Home;