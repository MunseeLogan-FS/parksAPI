require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

const nationalParkRouter = require("./routes/nationalParks");

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use("/api/v1/nationalParks", nationalParkRouter);

app.use(express.static(path.join(__dirname, "../reactjs/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../reactjs/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
