import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import config from "config";
import randomstring from "randomstring";
import verifyToken from "../../middlewares/auth/index.js";
import {
  errorMiddleware,
} from "../../middlewares/validations/index.js";
//Import Models
import Product from "../../models/Product.js";


/*
    API EndPoint : /api/user/:email
    Method : GET
    Payload : Request.Params
    Access Type : 
    
    Description : User Info
*/
router.get("/",verifyToken, async (req, res) => {
  try {
    // res.send("Connected to products route");
    const allProducts = await Product.find({});
    res.status(200).json({ allProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Internal server error" });
  }
});

// router.post(
//   "/add",
//   errorMiddleware,
//   verifyToken,
//   async (req, res) => {
//     try {
//       let userID = req.user._id;
//       console.log(req.user._id);
      
//       const productData = await Product.findOne({ user: userID });
//       if (!productData) {
//         return res.status(404).json({ msg: "User not found" });
//       }
//       res.send("We're at this point");

      // productData.products.push(req.body);
      // await productData.save();
      // res.status(200).json({ msg: "Product added successfully" });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
// );

// router.delete("/delete/:productId", verifyToken, async (req, res) => {
//   try {
//     let userID = req.user._id;
//     console.log(userID);
    // let producttoDelete = req.params.productId;
    // let user = await Product.findOne({ user: userID });
    // let products = user.products;
    // if (!user) {
    //   return res.status(404).json({ msg: "Can't find that user" });
    // }
    // products = products.filter((ele) => ele._id != producttoDelete);
    // if (!products) {
    //   return res.status(404).json({ msg: "Can't find that produst" });
    // }
    // user.products = products;
    // await user.save();
//     res.status(200).json({ msg: "Product deleted successfully" });
//   } catch (error) {
//     console.error(error);
//   }
// });

// router.put(
//   "/edit/:productId",
//   errorMiddleware,
//   verifyToken,
//   async (req, res) => {
//     try {
      
//       let userID = req.user._id;
//       console.log(userID);
      // let productToChange = req.params.productId;
      
      // let user = await Product.findOne({ user: userID });
      // if (!user) {
      //   return res.status(404).json({ msg: "Can't find that user" });
      // }
      // let product = user.Products.findIndex((elem) => {
      //   return elem._id == productToChange;
      // });
      // if (product == -1) {
      //   return res.status(404).json({ msg: "Can't find a product with that ID" });
      // }
      // let oldProcuctsId = user.Products[product]._id; //old id
      // user.Products[product] = req.body; //updating with new data
      // user.Products[product]._id = oldProcuctsId;
      // await user.save();
//       res.status(200).json({ msg: "Product edited successfully" });
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );


export default router;
