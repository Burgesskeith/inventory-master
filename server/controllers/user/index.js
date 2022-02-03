import express from "express";
import bcrypt from "bcrypt";
import generateToken from "../../helpers/generateToken.js";
const router = express.Router();

// importing models
import User from "../../models/User.js";

import {
  registrationRules,
  errorMiddleware,
  loginRules,
} from "../../middlewares/validations/index.js";

import verifyToken from "../../middlewares/auth/index.js";

// router.get("/", (req, res) => {
//   res.send("Getting user successfully");
// });

/*
      API EndPoint : /api/users/register
      Method : POST
      Payload : Request.Body - name,email,password
      Access Type : Public
      Validations : 
          a) Check Valid Email,name and password
      Description : User Registration 
*/
router.post(
  "/register",
  registrationRules(),
  errorMiddleware,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(401).json({ msg: "User already exists" });
      }

      const newUser = new User(req.body);
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      //Generate the access Token
      return res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

/*
      API EndPoint : /api/users/login
      Method : POST
      Payload : Request.Body - email,password
      Access Type : Public
      Validations : 
          a) Check Valid Email and verify if password is the same
      Description : User Login 
*/
router.post("/login", loginRules(), errorMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid Login credentials" });
    }
    let correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ msg: "Invalid Login credentials" });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

/*
      API EndPoint : /api/users/profile
      Method : GET
      Payload : Extract _id from access token (x-auth-token from headers)
      Access Type : Private
      Description : User Profile  
*/
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
    return res.status(401).json({ msg: "User Not Found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Contribution to Lifestyle from here

/*
      API EndPoint : /api/users/profile
      Method : PUT
      Payload : Extract _id from access token (x-auth-token from headers)
      Access Type : Private/User
      Description : User Update Profile  
*/
// response format same as register route (no validation rules needed)
//  didn't get this one working

router.put("/profile", verifyToken, async (req, res) => {
  try {
    let newName, newEmail, newPass;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res(401).json({ msg: "That user was not found" });
    }
    let correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ msg: "Invalid Login credentials" });
    }
    //  compare details.
    if (req.body.name !== user.name) {
      // make change
      newName = req.body.name;
    }
    if (req.body.email !== user.email) {
      // maknee change
      newEmail = req.body.email;
    }
    if (req.body.password !== user.password) {
      // make change
      newPass = await bcrypt.hash(req.body.password, salt);
    }

    // User.updateOne(
    //   { name: user.name },
    //   { name: newName, email: newEmail, password: newPass }
    // );

    return res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
    return res.status(200).json({ msg: "Profile coming" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

/*
      API EndPoint : /api/users
      Method : GET
      Payload : Extract _id from access token (x-auth-token from headers)
      Access Type : Private/Admin
      Description : Get All the Users of LifeStyle Store 
*/
// response format array of users
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res(401).json({ msg: "That user was not found" });
    }
    if (!user.isAdmin) {
      return res.status(401).json({ msg: "Only available to admins" });
    }
    const userList = await User.find({});

    return res.status(200).json(userList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

/*
      API EndPoint : /api/users/:id
      Method : DELETE
      Payload : Extract _id from access token (x-auth-token from headers) and req.params.id
      Access Type : Private/Admin
      Description : Delete User 
*/
// response format : User Deleted Succesfully

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    let userToDelete = req.params.id;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res(401).json({ msg: "That user was not found" });
    }
    if (!user.isAdmin) {
      return res.status(401).json({ msg: "Only available to admins" });
    }
    console.log("we're going to drop " + userToDelete);
    await User.deleteOne({ _id: userToDelete });
    return res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

/*
      API EndPoint : /api/users/:id
      Method : GET
      Payload : Extract _id from access token (x-auth-token from headers) and req.params.id
      Access Type : Private/Admin
      Description : Get User Details by ID from Admin
*/
// response format : user object
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res(401).json({ msg: "That user was not found" });
    }
    if (!user.isAdmin) {
      return res.status(401).json({ msg: "Only available to admins" });
    }
    let userToFind = await User.findById(req.params.id);
    console.log("we're going to return " + userToFind);
    return res.status(200).json({ userToFind });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

/*
      API EndPoint : /api/users/:id
      Method : PUT
      Payload : Extract _id from access token (x-auth-token from headers) and req.params.id
      Access Type : Private/Admin
      Description : Update User Details by ID from Admin
*/
// response format : user object

export default router;
