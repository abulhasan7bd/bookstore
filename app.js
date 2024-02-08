const express = require("express");
const { MongoDburl, PORT } = require("./confiq.js");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const router = require("./routes/bookroutes.js");
const cors = require("cors");
app.use(cors());

// custom origin 
// app.use(cors({
//   origin:'http://localhost:3000',
//   methods:['GET','POST','PUT','DELETE'],
//   allowedHeaders:['Content-Type']
// }))
app.use("/books", router);

mongoose
  .connect(MongoDburl)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
