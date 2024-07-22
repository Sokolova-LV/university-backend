const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();

// middleware //
app.use(bodyParser.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);

// connect to MongoDB //
mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });

/* const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
}); */

// define routes //
app.use('/api/lectures', require('./routes/lecturers'));
app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/workloads', require('./routes/workloads'));

// start server //

/* app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); */