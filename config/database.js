const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB CONNECTION IS SUCCESSFUL");
    })
    .catch((err) => {
        console.log("DB connection issues");
        console.error(err);
        process.exit(1);
    });
};
