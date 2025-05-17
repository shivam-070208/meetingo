const clientRoute = require('express').Router();

//middleware
clientRoute.use((req, res, next) => {
    if (req.cookies && req.cookies.token) {
        next();
    } else {
        res.redirect('/login');
    }
});

clientRoute.get('/login', (req, res) => {
    res.render('login');
}
);
clientRoute.get('/signin', (req, res) => {
    res.render('signin');
    
}
);
clientRoute.get('/',(req, res) => {
 
        res.redirect('/login');
    

}
);



module.exports = clientRoute;