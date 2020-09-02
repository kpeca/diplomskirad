import React from 'react'
import './RestaurantCard.css'
import { Link } from 'react-router-dom'


export const RestaurantCard = ({restaurant}) => {
    console.log(restaurant)
    return (
        <div>
        <Link to={{ pathname: `/restaurant/${restaurant._id}` }}>
        <div className="card-rest" key={restaurant._id}>
            
            <img
            src={restaurant.image}
            alt= ""
            />
            <div className="text">
            
            <h4> {restaurant.name} </h4>
            
            <h5> {restaurant.address}</h5>
            <h5 class="type">{restaurant.type}</h5>
            </div>
           
        </div>
        </Link>
        </div>
    )
}

export default RestaurantCard