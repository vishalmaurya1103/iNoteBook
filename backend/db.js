const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost/inotebook';

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDB Successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectMongo;
