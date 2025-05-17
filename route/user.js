const userRoute = require('express').Router();

userRoute.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    res.redirect('/');
});

module.exports = userRoute;