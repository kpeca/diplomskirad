import React, {useState, useEffect} from 'react'
import RestaurantCard from '../components/RestaurantCard'

export const MyRestaurants = () => {

    const [restaurant, setRestaurants] = useState([]);
    useEffect(() => {
        fetch('/all', {
          method: "get",
          headers: {
            "Authorization" : "Bearer " + localStorage.getItem("jwt"),  
            "Content-Type" : "application/json",
            "Accept" : "application-json"
          }
        }  )
        .then(res=> res.json())
        .then(data => {
          console.log(data.restaurants)
         setRestaurants(data.restaurants)
        })
    },[])
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)

    return (
        
        <div className="results">
            {
                restaurant.filter(r => r.postedBy === user._id).map((restaurant) => (
                    <RestaurantCard  restaurant = {restaurant}/>
                ) )}
            
        </div>
        
    )
}

export default MyRestaurants