import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const useGetLocations = (locationInput) => {
    const [locations, setLocations] = useState([]);
    useEffect(()=> {
      async function getLocations() {
        try{
          const {data}= await axios.get(`https://nominatim.openstreetmap.org/search?q=${locationInput}&format=json`);
          setLocations(data);
        }catch(error){
          toast.error(error, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "light",
            // transition: Slide,
            });
        }
      }
      getLocations();
    },[locationInput])
    // console.log(locations);
    return locations;
}
export default useGetLocations;