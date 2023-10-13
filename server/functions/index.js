const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv");
const express = require("express");

const serviceAccountKey = require("./serviceAccountKey.json");
const app = express();

app.use(express.json());
const FRONTEND_URL = "http://localhost:3000/";
const cors = require("cors");
app.use(cors({ origin: true }));

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

const productRoute = require("./routes/products");
app.use("/api/products/", productRoute);

exports.app = onRequest(app);
