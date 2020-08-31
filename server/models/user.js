const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'basic', enum: ['basic','admin']},
  //  accessToken: {type: String}
});

mongoose.model("User", user);