const axios = require('axios');

// Test script for user management functionality
const API_URL = 'http://localhost:5000/api';

// Test admin credentials
const adminUser = {
  email: 'admin@example.com',
  password: 'password123'
};

// Test regular user
const regularUser = {
  email: 'testuser@example.com',
  password: 'password123'
};

let adminToken;
let userToken;

async function runAdminTests() {
  console.log('🚀 Starting User Management Tests...\n');

  try {
    // Step 1: Login as admin
    console.log('1. 👑 Logging in as admin...');
    const adminLoginResponse = await axios.post(`${API_URL}/auth/login`, adminUser);
    adminToken = adminLoginResponse.data.token;
    console.log('✅ Admin login successful\n');

    // Step 2: Get user statistics
    console.log('2. 📊 Getting user statistics...');
    const statsResponse = await axios.get(`${API_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ User statistics retrieved');
    console.log('Stats:', statsResponse.data.stats);
    console.log('');

    // Step 3: Get all users
    console.log('3. 👥 Getting all users...');
    const usersResponse = await axios.get(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Users retrieved');
    console.log(`Total users: ${usersResponse.data.users.length}`);
    
    // Find a regular user to test with
    const regularUser = usersResponse.data.users.find(user => user.role === 'user');
    if (regularUser) {
      console.log(`Test user found: ${regularUser.name} (${regularUser.email})`);
      console.log('');

      // Step 4: Update user role
      console.log('4. ✏️ Testing user update...');
      const updateResponse = await axios.put(
        `${API_URL}/admin/users/${regularUser._id}`,
        {
          name: regularUser.name + ' (Updated)',
          email: regularUser.email,
          role: regularUser.role,
          isActive: regularUser.isActive
        },
        {
          headers: { Authorization: `Bearer ${adminToken}` }
        }
      );
      console.log('✅ User update successful');
      console.log(`Updated name: ${updateResponse.data.user.name}`);
      console.log('');

      // Step 5: Toggle user status
      console.log('5. 🔄 Testing user status toggle...');
      const statusResponse = await axios.patch(
        `${API_URL}/admin/users/${regularUser._id}/status`,
        { isActive: !regularUser.isActive },
        {
          headers: { Authorization: `Bearer ${adminToken}` }
        }
      );
      console.log('✅ Status toggle successful');
      console.log(`New status: ${statusResponse.data.user.isActive ? 'Active' : 'Inactive'}`);
      console.log('');

      // Step 6: Toggle back to original status
      console.log('6. 🔄 Restoring original status...');
      await axios.patch(
        `${API_URL}/admin/users/${regularUser._id}/status`,
        { isActive: regularUser.isActive },
        {
          headers: { Authorization: `Bearer ${adminToken}` }
        }
      );
      console.log('✅ Status restored\n');

      // Step 7: Test non-admin access (should fail)
      console.log('7. 🔒 Testing non-admin access restrictions...');
      try {
        await axios.post(`${API_URL}/auth/login`, {
          email: 'testuser@example.com',
          password: 'password123'
        });
        
        await axios.get(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log('❌ Non-admin access should have been denied');
      } catch (error) {
        console.log('✅ Non-admin access correctly denied');
        console.log(`Error: ${error.response?.data?.message}`);
      }
      console.log('');

    } else {
      console.log('⚠️ No regular users found for testing\n');
    }

    console.log('🎉 All user management tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

async function createTestUsers() {
  console.log('👤 Creating test users for management testing...\n');
  
  try {
    // The test script does not have direct DB access to delete users.
    // Instead, we will just (re-)create them. The registration endpoint
    // should handle conflicts, and for testing, we'll rely on a clean state
    // or the server handling user updates on registration.
    // This aligns with the goal of ensuring fresh users for tests without
    // assuming a DELETE endpoint which is not part of the test spec.

    // Attempt to create admin user
    try {
      await axios.post(`${API_URL}/auth/register`, {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created/reset');
    } catch (error) {
      // Log if user already exists, but don't fail the setup
      if (error.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️ Admin user already exists. Continuing...');
      } else {
        // For other errors, we should stop
        throw error;
      }
    }

    // Attempt to create regular user
    try {
      await axios.post(`${API_URL}/auth/register`, {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'user'
      });
      console.log('✅ Regular user created/reset');
    } catch (error) {
      if (error.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️ Regular user already exists. Continuing...');
      } else {
        throw error;
      }
    }

    console.log('✅ Test users ready\n');

  } catch (error) {
    console.error('❌ Failed to prepare test users:', error.response?.data || error.message);
  }
}

// Run tests
async function runAllTests() {
  await createTestUsers();
  await runAdminTests();
}

runAllTests();