import React,{useState,useEffect} from 'react'
import { RestaurantCard } from '../components/RestaurantCard'


const Home = () => {
    const [restaurant, setRestaurants] = useState([]);
    useEffect(() => {
        fetch('/all', {
          method: "get",
          headers: {
            "Authorization": "Bearer "+localStorage.getItem("jwt"), 
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
 
    
    console.log(restaurant)
    return (
        <div className="results">
          

            { restaurant.map === null ? <h1>No restaurants</h1> : restaurant.map((restaurant) => (
              <RestaurantCard  restaurant = {restaurant}/>
            )) }  
        </div>  
           )
}

export default Home
