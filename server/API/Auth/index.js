// Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

//Models
import { UserModel } from "../../database/user";
// validation
import { validateSignup, validateSignin } from "../../validation/auth";

const Router = express.Router();

/*
Route: signup
Description: Signup with email and password
Params none 
Access Public
Method Post 
*/
Router.post("/signup", async (req, res) => {
  try {
    await validateSignup(req.body.credentials);
    await UserModel.findByEmailAndPhone(req.body.credentials);
    // save to DB
    const newUser = await UserModel.create(req.body.credentials);
    // generate JWT auth token
    const token = newUser.generateJwtToken();
    //return
    return res.status(200).json({ token, status: "Success!!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route: signin
Description: Signin with email and password
Params none 
Access Public
Method Post 
*/
Router.post("/signin", async (req, res) => {
  try {
    await validateSignin(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    // generate JWT auth token
    const token = user.generateJwtToken();
    //return
    return res.status(200).json({ token, status: "Success!!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/*
Route:        /google
Description: google signin
Params none 
Access Public
Method Post 
*/
// Router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ],
//   })
// );

/*
Route:        google/callback
Description:  google singin callback
Params        none 
Access        Public
Method        get
*/
// Router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     return res.json({ token: req.session.passport.user.token });
//   }
// );

export default Router;
