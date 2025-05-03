const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to UserProfile DB"))
  .catch((err) => console.error("DB Error:", err));

app.get("/", (req, res) => {
    res.send("UserProfile Service is running");
  });
  

app.use("/api/profile", require("./routes/profileRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`UserProfile Service running on port ${PORT}`)
);
