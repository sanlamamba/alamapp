import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import fs from "fs";
const morgan = require("morgan");
require("dotenv").config();

// set up express app
const app = express();

// mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// set up middleware
app.use(
  express.json({
    limit: "500mb",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// set up routes
// send public folder as static
app.use("/public", express.static("public"));

fs.readdirSync("./routes").map((file) => {
  app.use("/api", require(`./routes/${file}`));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
