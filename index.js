const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Load environment variables
dotenv.config();

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

// Start the server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await connectDB(); // Ensure DB is connected before starting the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
