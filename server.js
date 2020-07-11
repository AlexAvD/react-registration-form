require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 8080;

const User = require("./models/user");
const isEmail = (str) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str);
const uri =
  "mongodb+srv://user:1234567890@cluster0.jgjzd.mongodb.net/reg-app?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "build")));

app.post("/api/signup", (req, res, next) => {
  const { email, phone } = req.body;

  User.find({ $or: [{ email }, { phone }] })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email or phone exists",
        });
      } else {
        const { password } = req.body;
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const { name, nickname, email, phone } = req.body;

            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name,
              nickname,
              email,
              phone,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

app.post("/api/login", (req, res, next) => {
  const { emailOrPhone } = req.body;
  const key = isEmail(emailOrPhone) ? "email" : "phone";

  User.find({ [key]: emailOrPhone })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );

          return res.status(200).json({
            message: "Auth successful",
            token,
            nickname: user[0].nickname,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

app.use("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(port);
