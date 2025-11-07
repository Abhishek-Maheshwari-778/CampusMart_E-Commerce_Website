const mongoose = require('mongoose');
const User = require('./models/User');

async function cleanupUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/marketplace');
    console.log('Connected to MongoDB');

    // Delete test users
    const result = await User.deleteMany({ 
      email: { $in: ['admin@example.com', 'testuser@example.com'] } 
    });
    
    console.log(`Deleted ${result.deletedCount} test users`);
    
    // Disconnect
    await mongoose.disconnect();
    console.log('Cleanup completed');
    
  } catch (error) {
    console.error('Cleanup failed:', error.message);
    process.exit(1);
  }
}

cleanupUsers();