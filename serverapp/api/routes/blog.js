const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/", blogController.allBlogPost);
router.post("/", blogController.addBlogPost);
router.delete("/:blogId", blogController.deleteBlogPost);
router.put("/:blogId", blogController.updateBlogPost);

module.exports = router;
