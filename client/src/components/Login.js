import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Error from './Error';
import Loading from './Loading';

function Login() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    useEffect(() => {
        if (userInfo) {
            history('/');
        }
    }, [userLogin])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <img src="images/image1.png" />
                    </div>
                    <div className="col-4">
                        <h1> Login</h1>
                        {loading && <Loading />}
                        {error && <h4 style={{ color: 'red' }}> {error}</h4>}
                        <form id="LoginForm" onSubmit={submitHandler}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* <input className="btn" type='submit' value='Login' /> */}
                            <button className='btn'>Login</button>
                        </form>
                        <div> New User ? <Link to="/register">Register </Link></div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Login;
