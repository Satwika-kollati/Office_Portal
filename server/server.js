require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const shiftSwapRoutes = require('./routes/ShiftSwap')

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/shiftSwap', shiftSwapRoutes);

// Start server
mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    //listen for requests
    app.listen(process.env.PORT,()=>{
        console.log('connected to db & listening on port',process.env.PORT)
    })
 })
 .catch ((error)=>{
    console.log(error)
 })