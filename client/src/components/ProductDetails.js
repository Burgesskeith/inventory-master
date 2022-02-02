import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Rating from './Rating';
function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data);
        }
        fetchProducts();
    }, []);
    return (
        <div className="small-container single-product">
            <div className="row">
                <div className="col-2">
                    <img src={product.image} width="100%" id="ProductImg" />
                </div>
                <div className="col-2">
                    <p><Link to='/' style={{ color: 'red' }}> Home </Link> / {product.name}</p>
                    <h1>{product.name}</h1>
                    <Rating rating={product.rating} />
                    <h3 style={{ color: "#ff523b" }}>{product.rating} from {product.numReviews} reviews</h3>
                    <h4>${product.price}</h4>
                    <h4>Status : {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</h4>
                    <a href="" className="btn">Add To Cart</a>

                    <h3>Product Details <i className="fa fa-indent"></i></h3>
                    <br />
                    <p>{product.description}</p>
                </div>
            </div>
        </div>


    );
}

export default ProductDetails;
