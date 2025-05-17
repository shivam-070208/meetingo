const express = require('express');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
}
);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
