const express = require('express');

const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('login', { title: 'Home' });
}
);

app.get('/google-auth', (req, res) => {
   console.log(req.body);
   res.redirect('/');
    
}
);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
