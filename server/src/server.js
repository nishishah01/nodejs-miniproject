import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import UserModel from './models/User.js';

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/users')

app.post('/login',  (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email, password })
    .then(user => {
        if (user) {
           if (user.password === password) {
            res.json("Success");
           }
           else{
            res.json("Wrong password");
           }
        }
        else {
            res.json("User not found");
        }
    })
})

app.post('/register',  (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})