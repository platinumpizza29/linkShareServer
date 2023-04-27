const mongoose = require("mongoose");

const Posts = new mongoose.Schema({
  email: String,
  category: String,
  link: String,
  date: String,
  time: String,
});

module.exports = mongoose.model("Posts", Posts);
