const express = require("express");
const { connection } = require("./configs/db");
const { UserModel } = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authenticate } = require("./middleware/authentication");
const { todoRouter } = require("./routes/todo.route");
const cors = require('cors')
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
    origin : "*"
}))
app.post("/signup", async (req, res) => {
  const { email, password, age, name } = req.body;
  const checkEmail = await UserModel.find({ email });
  if (checkEmail.length > 0) {
    res.send({ msg: "Email alredy exist" });
  }
  try {
    bcrypt.hash(password,4, async (err, hash) => {
      const user = new UserModel({ email, password: hash, age, name });
      console.log(user)
      await user.save();
      res.send({ msg: "Signed up successfully" });
    });
  } catch (error) {
    console.log(error);
    res.send({ err: "unable to signin please try again letter" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await UserModel.find({email});
    console.log(checkUser);
    if (checkUser.length > 0) {
      const hash_pass = checkUser[0].password;
      bcrypt.compare(password, hash_pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: checkUser[0]._id },
            process.env.jwtkey
          );
          res.send({ msg: "Login Successfull", token: token });
        } else {
          res.send({ msg: "your passwor is not correct" });
        }
      });
    } else {
      res.send({ msg: "login first" });
    }
  } catch (error) {
    console.log(error);
    res.send({ err: "something went wrong" });
  }
});
app.use(authenticate);
app.use('todo',todoRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db success");
  } catch (error) {
    console.log(error);
    console.log("somethig went wrong on connecting to db");
  }
});
