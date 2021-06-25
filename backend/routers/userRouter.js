import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import data from "../data.js";
import { generateToken } from "../utilities.js";

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
   //await User.deleteMany({});
   const createdUsers = await User.insertMany(data.users);
   res.send({ createdUsers });
  })
);

userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
       const emailCompare = await User.findOne({email: req.body.email});
       if (emailCompare) {
          //console.log(emailCompare)
          return res.status(400).send({ message: 'This email is already taken' });
       }
       const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
       });
       const createdUser = await user.save();
       res.send({
          _id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
          isAdmin: createdUser.isAdmin,
          token: generateToken(createdUser),
       });
    })
);

userRouter.post('/login', expressAsyncHandler(async (req, res) => {
   const user = await User.findOne({email: req.body.email});
   //DB email compared with entered email
   if (user) {
      if(bcrypt.compareSync(req.body.password, user.password)) {
         //entered password to compare with DB pass
         res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
         });
         return;
      }
   }
   res.status(401).send({ message: 'Invalid email or password' });
 })
);

export default userRouter;