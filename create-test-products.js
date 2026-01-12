const axios = require('axios');

// Create test products with variants and options
const API_URL = 'http://localhost:5000/api';

const testProducts = [
  {
    name: 'Introduction to Algorithms',
    description: 'The standard algorithm guide for CS students. Slightly used but in great condition.',
    price: 450.00,
    category: 'Books',
    brand: 'MIT Press',
    images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80'],
    stock: 5,
    rating: 4.8,
    specifications: {
      'Edition': '3rd Edition',
      'Author': 'Cormen, Leiserson, Rivest, Stein',
      'Condition': 'Good'
    },
    tags: ['books', 'cs', 'algorithms', 'textbook'],
    options: {},
    variants: []
  },
  {
    name: 'Scientific Calculator fx-991ES Plus',
    description: 'Perfect for engineering exams. Solar powered and approved for University exams.',
    price: 850.00,
    category: 'Gadgets',
    brand: 'Casio',
    images: ['https://images.unsplash.com/photo-1574607383476-f517b260d35b?auto=format&fit=crop&w=800&q=80'],
    stock: 12,
    rating: 4.9,
    specifications: {
      'Model': 'fx-991ES Plus',
      'Power': 'Solar + Battery',
      'Type': 'Scientific'
    },
    tags: ['calculator', 'engineering', 'math', 'gadgets'],
    options: {},
    variants: []
  },
  {
    name: 'MacBook Air M1 (2020)',
    description: 'Space Grey, 256GB SSD. Used for 1 year, battery health 92%. Perfect for coding.',
    price: 45000.00,
    category: 'Electronics',
    brand: 'Apple',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=800&q=80'],
    stock: 2,
    rating: 5.0,
    specifications: {
      'Processor': 'Apple M1',
      'RAM': '8GB',
      'Storage': '256GB SSD'
    },
    tags: ['laptop', 'apple', 'macbook', 'electronics'],
    options: {
      'Color': 'Space Grey,Silver'
    },
    variants: [
      {
        name: 'Space Grey 256GB',
        options: { 'Color': 'Space Grey' },
        price: 45000.00,
        stock: 1,
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=800&q=80']
      },
      {
        name: 'Silver 256GB',
        options: { 'Color': 'Silver' },
        price: 45000.00,
        stock: 1,
        images: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80']
      }
    ]
  },
  {
    name: 'University Hoodie',
    description: 'Premium cotton hoodie with University logo. Warm and comfortable.',
    price: 799.00,
    category: 'Clothing',
    brand: 'CampusMart Merch',
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'],
    stock: 50,
    rating: 4.5,
    specifications: {
      'Material': '80% Cotton, 20% Polyester',
      'Fit': 'Unisex'
    },
    tags: ['clothing', 'hoodie', 'winter', 'merch'],
    options: {
      'Size': 'S,M,L,XL',
      'Color': 'Navy,Grey'
    },
    variants: [
      {
        name: 'Navy Medium',
        options: { 'Size': 'M', 'Color': 'Navy' },
        price: 799.00,
        stock: 15,
        images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80']
      }
    ]
  },
  {
    name: 'Handwritten DBMS Notes',
    description: 'Complete semester notes for Database Management Systems. Includes SQL queries and diagrams.',
    price: 150.00,
    category: 'Notes',
    brand: 'Student Notes',
    images: ['https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80'],
    stock: 999,
    rating: 4.7,
    specifications: {
      'Pages': '45',
      'Format': 'PDF / Physical Copy',
      'Subject': 'Computer Science'
    },
    tags: ['notes', 'study', 'dbms', 'exams'],
    options: {},
    variants: []
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