import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from "../actions/productActions";
import Loading from './Loading';
import Error from './Error';
import Rating from './Rating';
function ProductDetails() {
    const history = useNavigate();
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    useEffect(() => {
        dispatch(listProductDetails(id));
    }, []);
    const addToCartHandler = () => {
        history(`/cart/${id}?qty=${qty}`);
    }
    return (
        <>
            {loading ? <Loading /> : error ? <Error error={error} /> : (
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

                            {product.countInStock > 0 ? (
                                <>
                                    <select type="number" value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {[...Array(product.countInStock)].map((x, index) => (
                                            <option key={index + 1}>{index + 1}</option>
                                        ))}
                                    </select>
                                    <button className="btn" onClick={addToCartHandler}>Add To Cart</button>
                                </>
                            ) : <h4>Status : Out of Stock. Check Back Later </h4>
                            }


                            <h3>Product Details <i className="fa fa-indent"></i></h3>
                            <br />
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>

            )}
        </>


    );
}

export default ProductDetails;
