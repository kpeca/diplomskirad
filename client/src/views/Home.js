import React,{useState,useEffect} from 'react'
  import { RestaurantCard } from '../components/RestaurantCard'

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        fetch('/all', {
          method: "get",
          headers: {
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

    return (
        <div className="results">
          {
            restaurants.map((restaurant) => (
              <RestaurantCard restaurant = {restaurant}/>
            ))}
        </div>  
           )
}

export default Home
