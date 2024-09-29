const express = require("express");
const app = express();
const cors = require("cors");
const Port = 8000;
const bodyParser = require("body-parser");

app.use(express.json());
const m = require("./router");
const whitelist = ["http://127.0.0.1:3000", "http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/", m);

const mongo = require("mongoose");
mongo
  .connect("mongodb+srv://chenrayan:che4068@cluster0.tjnimv7.mongodb.net/", {
    UseNewUrlParser: true,
  })

  .then(() => console.log("database connected"))
  .catch(() => console.log(" database not connected"));

app.listen(Port, () => {
  console.log(`server is runing port ${Port}`);
});
