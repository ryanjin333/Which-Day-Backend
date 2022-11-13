//Express Framework
const express = require('express');
const app = express();
const PORT = 8005;

//Cors Middleware
const cors = require("cors");
const corsOptions = {
   origin : '*', 
   credentials : true,
   optionSuccessStatus : 200,
}

app.use([cors(corsOptions), express.json()]);

app.listen(
    PORT,
    () => console.log(`Api is working on port ${PORT}`)
)

module.exports = app;