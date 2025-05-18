const userRoute = require('express').Router();
const UserModel = require('../database/usermodule');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

userRoute.post('/login',async (req, res) => {
    const { Email , password } = req.body;
    console.log(req.body);
    try{
        console.log(req.body +"23");
        const user = await UserModel.findOne({ email: Email });
        if(user){
            console.log(req.body);
            if(user.password === password){
                const token = jwt.sign(Email,process.env.JWT_SECRET,{
                    expiresIn: '10h'
                });
                res.clearCookie('token');
                res.cookie('token', token);
                res.redirect('/');
            }else{
                res.redirect('/login?message=Invalid%20credentials');
            }
        }
        else{
            console.log(req.body);
            res.redirect('/login?message=No%20user%20found');
        }
    }catch(err){
        console.log(err);
        res.redirect('/login?message=Error%20occurred%20at%20at%20server%20side');
    }

   
});
userRoute.post('/signin', async (req, res) => {
    const { username, Email, password } = req.body;
   console.log(req.body);
    try {
        const user = await UserModel.findOne({ email: Email });
        if (user) {
            res.redirect('/login',{message: 'User already exists try by login in'});
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new UserModel({
                username,
                email: Email,
                password: hashedPassword
            });
            const token = jwt.sign(Email, process.env.JWT_SECRET, {
                expiresIn: '10h'
            });
            res.clearCookie('token');
            res.cookie('token', token);
            await newUser.save();
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }
    
});

module.exports = userRoute;