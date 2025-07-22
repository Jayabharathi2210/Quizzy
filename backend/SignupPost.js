const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const User = require('./models/User');
const path = require('path');
const { error } = require('console');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/Login&Signup/Signup.html'));
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_STRING)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.post('/signup', async (req, res) => {
    
    console.log("Received signup request", req.body);  // Add this
    const { username, email, password } = req.body;

    try {

        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to register user" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});