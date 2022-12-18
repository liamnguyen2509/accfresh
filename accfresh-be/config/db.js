const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config({
  path: path.resolve(__dirname, `../env/${process.env.NODE_ENV}.env`)
});

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB_URI)
  .then((_) => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.log('Database connection failed.');
    console.log(err);
  });