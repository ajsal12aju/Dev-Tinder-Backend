const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

const app = express();
// this will convet the req.body data in to the js obj
app.use(express.json());
app.use(cookieParser());
// creatrinng new web server
// updated
// app.use will use will always take the http request other
//  the requset params we can pass all the thing like
//  app.get("/user/:userId/:name/:password", (req, res) => {
//    res.send("heloo from the server");
//  });
// we can pass the needed params like this
// updaeted







app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const userData = await User.find({ email: userEmail });
    if (userData.length === 0) {
      res.status(400).send("user not found");
    } else {
      res.send(userData);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("somthing went wrong with this");
  }
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const userData = await User.findById(id);
    res.status(200).send(userData);
  } catch (error) {
    res.status(400).send("sonthig went wrong");
  }
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndDelete(id);
    res.status(200).send("user is deleted succsuss");
  } catch (error) {
    res.status(400).send("somthing went wrong");
  }
});

app.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const data = await User.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("somthing went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send("somthing went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("DB connectted");
    app.listen(3000, () => {
      console.log("server is started");
    });
  })
  .catch((err) => {
    console.log(err, "===");
    console.log("DB is not connected");
  });

// listening the server for waiting incoming services
