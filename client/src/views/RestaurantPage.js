import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const RestaurantPage = (restaurants) => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [type, setType] = useState("")
    const [image, setImage] = useState("")

    useEffect(() => {
        axios.get(`/restaurants/${restaurants.match.params.id}`)
        .then(res => [
            setName(res.data.name),
            setAddress(res.data.address),
            setPhone(res.data.phone),
            setType(res.data.type),
           console.log(typeof(res.data)),
           setImage(res.data.image)
        ])
        .catch(err => console.log(err))
    },[])

   // console.log(address)
    return (
        
        <div>
            <h1> ajmo malo mi</h1>
            <h2>{name} </h2>
           asdasdasdads
           <img src={image}
           alt=""/>
        </div>
    )
}

export default RestaurantPage;