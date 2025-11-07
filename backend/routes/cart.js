const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'cart.product',
        populate: {
          path: 'seller',
          select: 'name email'
        }
      });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate cart totals
    let subtotal = 0;
    let totalItems = 0;
    
    const cartItems = user.cart.map(item => {
      const discountedPrice = item.product.price - (item.product.price * item.product.discount / 100);
      const itemTotal = discountedPrice * item.quantity;
      subtotal += itemTotal;
      totalItems += item.quantity;
      
      return {
        product: item.product,
        quantity: item.quantity,
        itemTotal: itemTotal
      };
    });

    res.json({
      cartItems,
      summary: {
        subtotal,
        totalItems,
        shipping: subtotal > 100 ? 0 : 10, // Free shipping over $100
        total: subtotal + (subtotal > 100 ? 0 : 10)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1, options = {}, variantId } = req.body;
    
    // Check if product exists and is active
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    let stockToCheck = product.stock;
    let priceToUse = product.price;
    
    // Handle variant selection
    if (variantId) {
      const variant = product.variants.find(v => v._id.toString() === variantId);
      if (!variant) {
        return res.status(404).json({ message: 'Variant not found' });
      }
      stockToCheck = variant.stock;
      priceToUse = variant.price;
    }
    
    // Check if enough stock
    if (stockToCheck < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if item already in cart with same options
    const existingItemIndex = user.cart.findIndex(
      item => 
        item.product.toString() === productId &&
        JSON.stringify(item.options || {}) === JSON.stringify(options) &&
        (item.variantId || '').toString() === (variantId || '').toString()
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      const newQuantity = user.cart[existingItemIndex].quantity + quantity;
      
      // Check stock again for new quantity
      if (stockToCheck < newQuantity) {
        return res.status(400).json({ message: 'Not enough stock available' });
      }
      
      user.cart[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item to cart
      user.cart.push({ 
        product: productId, 
        quantity,
        options,
        variantId: variantId || undefined
      });
    }
    
    await user.save();
    
    // Populate cart for response
    await user.populate({
      path: 'cart.product',
      populate: {
        path: 'seller',
        select: 'name email'
      }
    });
    
    res.json({
      message: 'Item added to cart successfully',
      cart: user.cart
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cart item quantity
router.put('/update/:productId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;
    
    // Check if product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Find item in cart
    const itemIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    // Update quantity
    user.cart[itemIndex].quantity = quantity;
    
    // Remove item if quantity is 0
    if (quantity <= 0) {
      user.cart.splice(itemIndex, 1);
    }
    
    await user.save();
    
    // Populate cart for response
    await user.populate({
      path: 'cart.product',
      populate: {
        path: 'seller',
        select: 'name email'
      }
    });
    
    res.json({
      message: 'Cart updated successfully',
      cart: user.cart
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove item from cart
    user.cart = user.cart.filter(
      item => item.product.toString() !== productId
    );
    
    await user.save();
    
    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Clear entire cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.cart = [];
    await user.save();
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;