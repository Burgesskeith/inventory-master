import express from "express";
const router = express.Router();
// import models
import Product from "../../models/Product.js";
import User from "../../models/User.js";
import verifyToken from "../../middlewares/auth/index.js";
import bcrypt from "bcrypt";
import randomstring from "randomstring";
import { errorMiddleware } from "../../middlewares/validations/index.js";

/*
    API EndPoint : /api/products/
    Method : GET
    Payload : -
    Access Type : Public
    Description : List all the products

    Try Challenge : Can you only list 10 products at a time ?? (pagesize = 10)
    Working - except pagesize feature
*/

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

/*
    API EndPoint : /api/products/:id
    Method : GET
    Payload : req.params.id
    Access Type : Public
    Description : List product by id
     - working
*/
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product Not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

/*
    API EndPoint : /api/products/:id
    Method : DELETE
    Payload : req.params.id and  Extract _id from access token (x-auth-token from headers)
    Access Type : Private/Admin
    Description : Delete Product by ID
*/
//response format : Product deleted succesfully
// not working

router.delete("/:productId", verifyToken, async (req, res) => {
  try {
    let { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product Not found" });
    }
    const userId = product.user;

    const user = await User.findById(userId);
    if (!user) {
      return res(401).json({ msg: "That user was not found" });
    }
    if (!user.isAdmin) {
      return res.status(401).json({ msg: "Only available to admins" });
    }
    await Product.deleteOne({ productId });
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
  }
});

/*
    API EndPoint : /api/products
    Method : POST
    Payload : Extract _id from access token (x-auth-token from headers)
    Access Type : Private/Admin
    Description : Insert a New Product
*/
// response format is product object
router.post("/add", errorMiddleware, verifyToken, async (req, res) => {
  try {
    let userID = req.user._id;
    console.log(req.user._id);

    const productData = await Product.findOne({ user: userID });
    if (!productData) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.send("We're at this point");

    productData.products.push(req.body);
    await productData.save();
    res.status(200).json({ msg: "Product added successfully" });
  } catch (error) {
    console.error(error);
  }
});

/*
    API EndPoint : /api/products/:id
    Method : PUT
    Payload : req.params.id and  Extract _id from access token (x-auth-token from headers)
    Access Type : Private/Admin
    Description : Update a Product
*/
//response format is updated product object

// router.put(
//   "/:productId",
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

/*
    API EndPoint : /api/products/:id/reviews
    Method : POST
    Payload : req.params.id (productid) and  Extract _id from access token (x-auth-token from headers), rating,comment
    Access Type : Private/User
    Description : Create a New Review for a Product
*/
//response format is product object
//Logical Validation
// 1) Do not let a user to review same product twice
//2) Update the rating and no of reviews fields

/*
    API EndPoint : /api/products/top
    Method : GET
    Access Type : PUBLIC
    Description : Sort top 3 products according to the rating
*/

export default router;
