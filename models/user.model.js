const mongoose = require('mongoose');

const userSchema=({
    email:String,
    password:String,
    name:String,
    age:Number
})

const UserModel = mongoose.model('user',userSchema);

module.exports = {UserModel};