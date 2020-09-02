import React, {useState,useEffect} from 'react'
import './TypeSearch.css'
export const TypeSearch = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
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
        // console.log(data)
         setRestaurants(data)
        })
    },[])
    const filterByType = (type) => {
    console.log( restaurants.restaurants.filter(rest => rest.type === type))
    //   console.log(restaurants.restaurants[0].type === 'Kafana')
    }

  

    return (
        <nav>
        <div className="nav">
          <h2 onClick={() => filterByType("Pekara")}>Restorani</h2>
          <h2>Kafane</h2>
          <h2>Picerije</h2>
          <h2>Palačinkarnice</h2>
          <h2>Pekare</h2>
          <h2>Kafići</h2>
          <h2>Brza Hrana</h2>
          
       </div>
     </nav>
    )
}

export default TypeSearch