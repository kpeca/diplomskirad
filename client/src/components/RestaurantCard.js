import React from 'react'
import './RestaurantCard.css'

export const RestaurantCard = ({restaurant}) => {
    return (
        <div className="card-rest">
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
    )
}
