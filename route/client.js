const clientRoute = require('express').Router();

//middleware


clientRoute.get('/login', (req, res) => {
    const { message } = req.query;
    if (message) {
        res.render('login', { message });
    } else {
        res.render('login');
    }
   
}
);
clientRoute.get('/signin', (req, res) => {
    res.render('signin');
    
}
);
clientRoute.get('/',(req, res) => {
 
        if(req.cookies && req.cookies.token){
            res.render('home');
        }else{
            res.redirect('/login');
        }

}
);



module.exports = clientRoute;