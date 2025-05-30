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
    if(req.cookies && req.cookies.token){
        res.redirect('/')
    }
   else res.render('signin');
    
}
);
clientRoute.get('/',(req, res) => {
        
        if(req.cookies && req.cookies.token){
         
            res.render('main');
        }else{
            res.redirect('/intro');
        }

}
);
clientRoute.get('/intro',(req, res) => {
    const {message}=req.query
    console.log(message)
        res.render('home',{message:message??''});

}
);



module.exports = clientRoute;