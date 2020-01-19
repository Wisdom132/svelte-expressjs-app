let mongoose = require("mongoose");
let blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});
var Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
