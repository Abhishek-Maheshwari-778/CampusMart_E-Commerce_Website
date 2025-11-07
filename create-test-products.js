const axios = require('axios');

// Create test products with variants and options
const API_URL = 'http://localhost:5000/api';

const testProducts = [
  {
    name: 'Smartphone',
    description: 'Latest smartphone with advanced features',
    price: 699.99,
    category: 'Electronics',
    brand: 'TechBrand',
    images: ['https://via.placeholder.com/300x300?text=Smartphone'],
    stock: 50,
    rating: 4.5,
    specifications: {
      'Screen Size': '6.1 inches',
      'Storage': '128GB',
      'Camera': '12MP'
    },
    tags: ['smartphone', 'electronics', 'mobile'],
    options: {
      'Color': 'Black,White,Blue',
      'Storage': '128GB,256GB'
    },
    variants: [
      {
        name: 'Black 128GB',
        options: { 'Color': 'Black', 'Storage': '128GB' },
        price: 699.99,
        stock: 20,
        images: ['https://via.placeholder.com/300x300?text=Black+128GB']
      },
      {
        name: 'White 128GB',
        options: { 'Color': 'White', 'Storage': '128GB' },
        price: 699.99,
        stock: 15,
        images: ['https://via.placeholder.com/300x300?text=White+128GB']
      },
      {
        name: 'Blue 256GB',
        options: { 'Color': 'Blue', 'Storage': '256GB' },
        price: 799.99,
        stock: 15,
        images: ['https://via.placeholder.com/300x300?text=Blue+256GB']
      }
    ]
  },
  {
    name: 'T-Shirt',
    description: 'Comfortable cotton t-shirt',
    price: 29.99,
    category: 'Clothing',
    brand: 'FashionBrand',
    images: ['https://via.placeholder.com/300x300?text=T-Shirt'],
    stock: 100,
    rating: 4.2,
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Regular'
    },
    tags: ['clothing', 'tshirt', 'cotton'],
    options: {
      'Color': 'Red,Blue,Green,Black',
      'Size': 'S,M,L,XL'
    },
    variants: [
      {
        name: 'Red Medium',
        options: { 'Color': 'Red', 'Size': 'M' },
        price: 29.99,
        stock: 25,
        images: ['https://via.placeholder.com/300x300?text=Red+T-Shirt']
      },
      {
        name: 'Blue Large',
        options: { 'Color': 'Blue', 'Size': 'L' },
        price: 29.99,
        stock: 25,
        images: ['https://via.placeholder.com/300x300?text=Blue+T-Shirt']
      }
    ]
  },
  {
    name: 'Laptop',
    description: 'High-performance laptop for work and gaming',
    price: 1299.99,
    category: 'Electronics',
    brand: 'ComputerBrand',
    images: ['https://via.placeholder.com/300x300?text=Laptop'],
    stock: 30,
    rating: 4.7,
    specifications: {
      'Processor': 'Intel i7',
      'RAM': '16GB',
      'Storage': '512GB SSD'
    },
    tags: ['laptop', 'computer', 'electronics'],
    options: {
      'RAM': '8GB,16GB,32GB',
      'Storage': '256GB,512GB,1TB'
    },
    variants: [
      {
        name: '16GB RAM 512GB SSD',
        options: { 'RAM': '16GB', 'Storage': '512GB' },
        price: 1299.99,
        stock: 15,
        images: ['https://via.placeholder.com/300x300?text=Laptop+16GB']
      }
    ]
  }
];

async function createTestProducts() {
  console.log('📦 Creating test products...\n');

  try {
    // First, login as admin to get auth token
    console.log('🔑 Logging in as admin...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    const authToken = loginResponse.data.token;
    console.log('✅ Admin login successful\n');

    // Create each test product
    for (let i = 0; i < testProducts.length; i++) {
      const product = testProducts[i];
      console.log(`Creating product ${i + 1}: ${product.name}`);
      
      try {
        const response = await axios.post(
          `${API_URL}/products`,
          product,
          {
            headers: { 
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(`✅ ${product.name} created successfully`);
        console.log(`   ID: ${response.data.product._id}`);
        console.log(`   Variants: ${response.data.product.variants?.length || 0}`);
      } catch (error) {
        if (error.response?.data?.message?.includes('already exists')) {
          console.log(`ℹ️ ${product.name} already exists`);
        } else {
          console.error(`❌ Failed to create ${product.name}:`, error.response?.data?.message || error.message);
        }
      }
      console.log('');
    }

    console.log('🎉 Test products creation completed!');

  } catch (error) {
    console.error('❌ Failed to create test products:', error.response?.data || error.message);
  }
}

createTestProducts();