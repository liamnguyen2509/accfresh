require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then((_) => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.log('Database connection failed.');
    console.log(err);
  });