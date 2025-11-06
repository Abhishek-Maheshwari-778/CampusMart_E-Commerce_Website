import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Layout Components
import MainNavbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './components/layout/HomePage';

// Marketplace Components
import ProductList from './components/marketplace/ProductList';
import ProductDetail from './components/product/ProductDetail';
import SellItem from './components/marketplace/SellItem';

// Auth Components
import Login from './components/auth/Login';

// About Page
import AboutPage from './components/about/AboutPage';

function App() {
  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <MainNavbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<ProductList />} />
            <Route path="/books" element={<ProductList category="books" />} />
            <Route path="/notes" element={<ProductList category="notes" />} />
            <Route path="/gadgets" element={<ProductList category="gadgets" />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/sell" element={<SellItem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
