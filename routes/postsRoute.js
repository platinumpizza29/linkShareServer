const router = require("express").Router();
require("../services/connection");
const Posts = require("../models/postModel");
const verify = require("../services/verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "Posts",
      description: "All posts",
    },
  });
});

router.post("/", verify, (req, res) => {
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
  post.save().catch((e) => {
    res.sendStatus(500);
  });
  res.send(post).status(200);
});

module.exports = router;
