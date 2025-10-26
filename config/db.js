const mongoose = require("mongoose");


const connectDb = async () => {
  try {
    mongoose.connect(process.env.URI);
    console.log("Successfully Connected");
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = connectDb;
