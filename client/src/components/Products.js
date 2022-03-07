import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from "../actions/productActions";
import Product from './Product';
import Loading from './Loading';
import Error from './Error';

function Products() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;
    useEffect(() => {
        dispatch(listProducts());
    }, []);

    return (
        <div className="small-container">
            <h1 className="title">Latest Products</h1>
            {loading ? <Loading /> : error ? <Error error={error} /> : (
                <div className="row">
                    {products.map(product => (
                        <Product product={product} key={product._id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;
