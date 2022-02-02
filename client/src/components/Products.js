import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Product from './Product';

function Products() {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        const fetchProducts = async ()=>{
            const {data} = await axios.get("/api/products");
            setProducts(data);
        }
        fetchProducts();
    },[]);
    return (
        <div className="small-container">
            <h1 className="title">Latest Products</h1>
            <div className="row">
                {products.map(product => (
                    <Product product={product} key={product._id} />
                ))}
            </div>
        </div>
    );
}

export default Products;
