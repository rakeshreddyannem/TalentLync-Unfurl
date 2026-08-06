const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/talentlync';
  
  try {
    // Attempt connecting to the configured MONGODB_URI with 2s selection timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[Database] Successfully connected to MongoDB at ${mongoose.connection.host}`);
    global.useInMemoryStore = false;
  } catch (error) {
    console.warn(`[Database] Local MongoDB connection failed (${error.message}).`);
    console.log('[Database] Operating in high-performance in-memory storage mode.');
    global.useInMemoryStore = true;
  }
};

module.exports = connectDB;
