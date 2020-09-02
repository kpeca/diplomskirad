const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Restaurant = mongoose.model("Restaurant");
const requireLogin = require('../middleware/requireLogin')
const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
}
function authRole(role) {
    return (req,res,next) => {
        if (req.user.role !== role){
            res.status(401)
            return res.send('Not allowed')
        }
        next();
    }
}

//ruta za dodavanje restorana
router.post('/addrestaurant', requireLogin, (req,res) => {
    const {name, address,type, phone, pic} = req.body
    if(!name || !address || !type || !phone || !pic ){
        console.log(address)
        res.status(422).json({error: "Please fill all fields"})
    } 
    const restaurant = new Restaurant({
        name,
        address,
        phone,
        image:pic,
        type,
        postedBy: req.user._id
    })
    
    restaurant.save().then(result => {
        res.json({post: result})
    })
    .catch(err =>{
        console.log(err)
    })
})

//ruta za prikaz svih restorana
router.get('/all',  (req,res) => {
    Restaurant.find()
    //.populate("postedBy")
    .then(p => {
        res.json({restaurants: p})
    })
    .catch(err=>{
        console.log(err)
    })
})

//ruta za prikaz restorana ulogovanog korisnika
router.get('/myrestaurants', (req,res) =>{
    Restaurant.find({postedBy: req.user._id})
    .populate("PostedBy","_id name")
    .then(myrestaurants => {
        res.json({myrestaurants})
    })
    .catch(err => {
        console.log(err)
    })
})

//ruta za prikaz odredjenog restorana
router.get('/restaurants/:id',  (req,res) => {
    Restaurant.findById(req.params.id)
    .then((restaurant) => {
        res.json(restaurant)
    })
    .catch(err => {
        console.log(err)
    })
})

//ruta za brisanje restorana
router.delete('/restaurant/:id',  (req,res) => {
    Restaurant.findByIdAndDelete(req.params.id)
    .then(() => {
        res.json("Restaurant deleted")
    })
    .catch(err => {
        console.log(err)
    })
})

//ruta za modifikaciju restorana
router.put('/update/:id', requireLogin, authRole(ROLE.ADMIN) ,(req,res) => {
    Restaurant.findById(req.params.id)
    .then(restaurant => {
        restaurant.name = reg.body.name;
        restaurant.address = reg.body.name;
        restaurant.phone = reg.body.phone;
        restaurant.image = reg.body.image;

        exercise.save()
        .then(()=> {
            res.json("Exercise updated");
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router