const mongoose = require('mongoose');

const todoSheme = ({
    taskname:String,
    status:String,
    tag:String
})
const TodoModel = mongoose.model('todo',todoSheme);
module.exports = {TodoModel}