const axios = require('axios');

// Test script for cart functionality with product options
const API_URL = 'http://localhost:5000/api';

// Test user credentials
const testUser = {
  email: 'testuser@example.com',
  password: 'password123'
};

let authToken;
let productId;

async function runTests() {
  console.log('🚀 Starting Cart Functionality Tests...\n');

  try {
    // Step 1: Login and get auth token
    console.log('1. 🔑 Logging in test user...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, testUser);
    authToken = loginResponse.data.token;
    console.log('✅ Login successful\n');

    // Step 2: Get a product to test with
    console.log('2. 📦 Getting test product...');
    const productsResponse = await axios.get(`${API_URL}/products`);
    if (productsResponse.data.products.length === 0) {
      console.log('❌ No products found. Please add some products first.');
      return;
    }
    productId = productsResponse.data.products[0]._id;
    console.log(`✅ Found product: ${productsResponse.data.products[0].name}\n`);

    // Step 3: Test adding item to cart without options
    console.log('3. 🛒 Testing basic cart addition...');
    const basicCartResponse = await axios.post(
      `${API_URL}/cart/add`,
      {
        productId: productId,
        quantity: 2
      },
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );
    console.log('✅ Basic cart addition successful');
    console.log(`Cart items: ${basicCartResponse.data.items?.length || 0}`);
    console.log(`Total: $${basicCartResponse.data.total || 0}\n`);

    // Step 4: Test adding item with options (if product has variants)
    console.log('4. 🎨 Testing cart addition with options...');
    const productResponse = await axios.get(`${API_URL}/products/${productId}`);
    const product = productResponse.data.product;
    
    if (product.variants && product.variants.length > 0) {
      const variant = product.variants[0];
      const optionsResponse = await axios.post(
        `${API_URL}/cart/add`,
        {
          productId: productId,
          quantity: 1,
          options: variant.options,
          variantId: variant._id
        },
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      console.log('✅ Cart addition with options successful');
      console.log(`Cart items: ${optionsResponse.data.items?.length || 0}`);
      console.log(`Total: $${optionsResponse.data.total || 0}\n`);
    } else {
      console.log('ℹ️ Product has no variants, skipping options test\n');
    }

    // Step 5: Test updating cart item quantity
    console.log('5. 📈 Testing cart item update...');
    const cartResponse = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (cartResponse.data.items?.length > 0) {
      const cartItemId = cartResponse.data.items[0]._id;
      const updateResponse = await axios.put(
        `${API_URL}/cart/update/${cartItemId}`,
        { quantity: 3 },
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      console.log('✅ Cart update successful');
      console.log(`Updated quantity: ${updateResponse.data.items?.[0]?.quantity}`);
      console.log(`Total: $${updateResponse.data.total || 0}\n`);
    }

    // Step 6: Test removing cart item
    console.log('6. 🗑️ Testing cart item removal...');
    const currentCart = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (currentCart.data.items?.length > 0) {
      const itemToRemove = currentCart.data.items[0]._id;
      const removeResponse = await axios.delete(
        `${API_URL}/cart/remove/${itemToRemove}`,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      console.log('✅ Cart item removal successful');
      console.log(`Remaining items: ${removeResponse.data.items?.length || 0}`);
      console.log(`Total: $${removeResponse.data.total || 0}\n`);
    }

    // Step 7: Test clearing cart
    console.log('7. 🧹 Testing cart clear...');
    const clearResponse = await axios.delete(`${API_URL}/cart/clear`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Cart clear successful');
    console.log(`Cart items after clear: ${clearResponse.data.items?.length || 0}`);
    console.log(`Total: $${clearResponse.data.total || 0}\n`);

    console.log('🎉 All cart tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run tests
runTests();