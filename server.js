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

// connect to MongoDB //
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

// define routes //
// app.use('/api/lectures', require('./routes/lectures'));
// app.use('/api/subjects', require('./routes/subjects'));
// app.use('/api/workloads', require('./routes/workloads'));

// start server //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});