const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectToDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('Successfully Connected to MongoDB...');
  } catch (e) {
    console.log(e.message);

    // Exits the process with a failure.
    process.exit(1);
  }
};

module.exports = connectToDB;
