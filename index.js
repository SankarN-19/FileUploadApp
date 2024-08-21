//Instantiating a server
const express = require("express");
const app = express();

//Loading configuration into the process object
require("dotenv").config();
const PORT =  process.env.PORT || 5500;

//Adding middlewares
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());

//Connecting Database
const dataBase = require("./config/database");
dataBase.dbConnect();

//Connecting Cloudinary
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect();

//Mounting API route
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

//Activating server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});


