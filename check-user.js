const mongoose = require('mongoose');
const User = require('./backend/models/User');

async function checkUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mern-ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Check if test user exists
    const testUser = await User.findOne({ email: 'testuser@example.com' });
    if (testUser) {
      console.log('Test user found:', {
        id: testUser._id,
        name: testUser.name,
        email: testUser.email,
        role: testUser.role,
        cart: testUser.cart
      });
    } else {
      console.log('Test user not found');
    }

    // Check if admin user exists
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    if (adminUser) {
      console.log('Admin user found:', {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role
      });
    } else {
      console.log('Admin user not found');
    }

    // List all users
    const allUsers = await User.find({});
    console.log(`Total users in database: ${allUsers.length}`);
    allUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - ID: ${user._id}`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

checkUser();