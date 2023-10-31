const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { DBConnection } = require('./DBConnection');
const adminRoutes = require('./Routes/adminRoutes');
const userRoutes = require('./Routes/userRoutes');

// Initialize Express app
const app = express();
dotenv.config();

// Set up middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// All Server configurations
app.config = {
    port: process.env.PORT || 6000,
};

// Databases connection
const db_url = process.env.db_url;

DBConnection(db_url)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Routes

// Initial route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to barter backed</h1>');
});

// Router middlewares
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Server listening on port
const port = app.config.port;
app.listen(port, () => {
    console.log(`Server listening on Port: ${port}`);
});
