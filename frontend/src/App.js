import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

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
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';

// Additional Pages
import FAQ from './components/pages/FAQ';
import Contact from './components/pages/Contact';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';
import Cart from './components/cart/Cart';

// About Page
import AboutPage from './components/about/AboutPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
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
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
