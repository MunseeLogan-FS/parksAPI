require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

const nationalParkRouter = require("./routes/nationalParks");

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
app.use(express.json());
app.use("/nationalParks", nationalParkRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
