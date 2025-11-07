const axios = require('axios');

// Create test users for testing
const API_URL = 'http://localhost:5000/api';

async function createTestUsers() {
  console.log('👥 Creating test users...\n');

  try {
    // Create regular test user
    try {
      await axios.post(`${API_URL}/auth/register`, {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'user'
      });
      console.log('✅ Regular test user created');
    } catch (error) {
      if (error.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️ Regular test user already exists');
      } else {
        throw error;
      }
    }

    // Create admin test user
    try {
      await axios.post(`${API_URL}/auth/register`, {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      });
      console.log('✅ Admin test user created');
    } catch (error) {
      if (error.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️ Admin test user already exists');
      } else {
        throw error;
      }
    }

    console.log('\n🎉 Test users ready!');

  } catch (error) {
    console.error('❌ Failed to create test users:', error.response?.data || error.message);
  }
}

createTestUsers();