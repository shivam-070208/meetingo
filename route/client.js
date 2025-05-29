const clientRoute = require('express').Router();

//middleware

clientRoute.get('/google-auth', (req, res) => {
    console.log(req.query);
   res.redirect('/login?message=Google%20authentication%20is%20not%20implemented%20yet');

});
clientRoute.get('/login', (req, res) => {
    const { message } = req.query;
    if (message) {
        res.render('login', { message });
    } else {
        res.render('login',{ message: null });
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