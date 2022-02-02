import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import HomeScreen from './components/HomeScreen';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';
function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path='/product/:id' element={<ProductDetails />} />
            </Routes>
            <Footer />
        </Router>

    );
}

export default App;
