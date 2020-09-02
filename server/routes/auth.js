const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const requireLogin = require('../middleware/requireLogin');
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



//ruta za registraciju korisnika
router.post('/signup', (req,res)=>{
  const {name, surname, email, password, role} = req.body;
  if(!name || !surname || !email || !password ){
      res.status(422).json({error : "please fill all the fields"});
  }
  User.findOne({email: email})
  .then((savedUser) => {
      if(savedUser){
          return res.status(422).json({error: "email already exists"});
      }
      bcrypt.hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
            name,
            surname,
            email,
            password : hashedPassword,
            role
        })
  
        user.save()
        .then(user => {
            res.json({message: "user saved successfully"})
        })
        .catch(err =>{
            console.log(err)
        })
      })
   
  })
  .catch(err=>{
      console.log(err)
  })
})

//ruta za logovanje korisnika
router.post('/signin', (req,res)=> {
    const {email, password} = req.body;
    if(!email || !password){
       return res.status(402).json({error: "Please enter email or password"});
    }
    User.findOne({email: email})
    .then(savedUser => {
        if(!savedUser){
           return res.status(422).json({error: "Email or password are wrong"});
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch){
             //   res.json({message: "Successfully logged in"})
             const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
             const {_id, name, email,role} = savedUser
             res.json({token: token, user: {_id, name, email,role} })
            }
            else {
                return res.status(422).json({error: "Invalid Email or password"});
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

//ruta za modifikaciju korisnika
router.put('/user/:id', requireLogin, (req,res) => {
    User.findById(req.params.id)
    .then(user => {
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.password = req.body.password;
        

        user.save()
        .then(()=> {
            res.json("User updated");
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err)
    })
})

//ruta za prikaz svih korisnika
router.get('/allusers',  (req,res) => {
    User.find()
    //.populate("postedBy")
    .then(u => {
        res.json({users: u})
    })
    .catch(err=>{
        console.log(err)
    })
})


//ruta za brisanje korisnika
router.delete('/user/:id',   (req,res) => {
    const id = req.params.id;
    console.log(id);
    User.findByIdAndRemove(req.params.id)
    .then(() => {
        res.json("User deleted")
    })
    .catch(err => {
        console.log(err)
    })
})
module.exports = router;