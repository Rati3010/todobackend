const express = require('express');
const { TodoModel } = require('../models/todo.model');
const todoRouter = express.Router();
todoRouter.get("/",async (req,res)=>{
    const todos = await TodoModel.find();
    res.send(todos);
})
todoRouter.post('/create',async(req,res)=>{
    const payload = req.body;
    try {
        const todo = new TodoModel(payload);
        await todo.save();
        res.send({'msg':'added successfully'}); 
    } catch (error) {
        console.log(error);
        res.send({'msg':"can't able to add"});
    }
})
todoRouter.patch("/edit/:todoid" , async(req,res)=>{
    const payload = req.body;
    const userId = req.body.userId
    const todoID = req.params.todoid
    const todo = await NoteModel.findOne({_id:userID});
    if(userId !== todo.userID){
        res.send("not authorized");
    }else{
        try {
            await NoteModel.findByIdAndUpdate({_id : todoID},payload)
            res.send({"msg" : "Note updated successfully"})
        } catch (error) {
            console.log(error);
            res.send("something went wrong");
        }
    }
})

todoRouter.delete("/delete/:todoId", async(req,res)=>{
    const todoID = req.params.todoId
    const userID = req.body.userID
    const todo = await NoteModel.findOne({_id:todoID})
    if(userID !== todo.userID){
        res.send("Not authorised")
    }
    else{
        await NoteModel.findByIdAndDelete({_id : todoID})
        res.send({"msg" : "Note deleted successfully"})
    }
})

module.exports = {todoRouter};