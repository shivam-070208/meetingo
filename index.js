const express = require('express');

// variable making
const app = express();
const path = require('path');

const connectDB = require('./config/mongodb');
const clientRoute = require('./route/client');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const userRoute = require('./route/user');

// Connect to the database
connectDB();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middle function 

// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/', clientRoute);
app.use('/api', userRoute);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'hare_hare',
    resave: false,
    saveUninitialized: true,
    secure: true
}));



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
