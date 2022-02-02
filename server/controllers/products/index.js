import express from "express";
const router = express.Router();
// import models
import Product from "../../models/Product.js";

/*
    API EndPoint : /api/products/
    Method : GET
    Payload : -
    Access Type : Public
    Description : List all the products

    Try Challenge : Can you only list 10 products at a time ?? (pagesize = 10)
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

/*
    API EndPoint : /api/products
    Method : POST
    Payload : Extract _id from access token (x-auth-token from headers)
    Access Type : Private/Admin
    Description : Insert a New Product
*/
//response format is product object

/*
    API EndPoint : /api/products/:id
    Method : PUT
    Payload : req.params.id and  Extract _id from access token (x-auth-token from headers)
    Access Type : Private/Admin
    Description : Update a Product
*/
//response format is updated product object


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