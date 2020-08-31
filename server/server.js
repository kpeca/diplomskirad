require('dotenv').config();
require('./models/user');
require('./models/restaurant');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;




app.use(express.json());

app.use(require('./routes/auth'));
app.use(require('./routes/restaurants'));




mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection established")
});

app.listen(port, ()=>{
    console.log(`The app is running on port ${port}`);
})