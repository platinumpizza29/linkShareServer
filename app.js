const express = require("express");
const app = express();
const cors = require("cors");

const postRoute = require("./routes/postsRoute");
const userAuthRoute = require("./routes/userAuth");

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/posts", postRoute);
app.use("/auth", userAuthRoute);

//port
app.listen(4000);
