const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurant = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    type: {type: String, required: true},
    image: {type: String, required: true},
    postedBy: {type: Object, ref: "restaurant"}
})

mongoose.model("Restaurant", restaurant);