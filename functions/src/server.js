//Express Framework
const express = require('express');
const app = express();


//Cors Middleware
const cors = require("cors");
app.use(cors({ origin: true }));

app.listen(9000, () => console.log("Port is working on 9000"));

module.exports = app;