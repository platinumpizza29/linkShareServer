const router = require("express").Router();
require("../services/connection");
const Posts = require("../models/postModel");
const verify = require("../services/verifyToken");

//get all posts irrespective of the user
router.get("/allPosts", verify, async (req, res) => {
  var allPosts = await Posts.find();
  return res.send(allPosts).status(200);
});

router.post("/addPost", verify, async (req, res) => {
  const email = req.body.email;
  const link = req.body.link;
  const date = req.body.date;
  const time = req.body.time;
  const category = req.body.category;
  const post = new Posts({
    email: email,
    link: link,
    date: date,
    time: time,
    category: category,
  });
  try {
    await post.save();
    return res.send(post).status(200);
  } catch (error) {
    return res.send(error).status(500);
  }
});

module.exports = router;
