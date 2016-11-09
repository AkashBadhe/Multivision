var auth = require('./auth'),
    users = require('../controllers/users'),
    courses = require('../controllers/courses'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    books = require('../controllers/books');
    restaurants = require('../controllers/restaurants');
module.exports = function (app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/courses', courses.getCourses);
    app.get('/api/courses/:id', courses.getCourseById);

    app.get('/api/books', books.getBooks);
    app.get('/api/books/:id', books.getBookById);
	app.post('/api/books', books.createBook);
	app.put('/api/books', books.updateBook);
    app.delete('/api/books/:id', books.deleteBookById);
    app.post('/api/books/search/', books.search);
	
    // routest for restorent search.
    app.get('/api/restaurants', restaurants.getRestaurants);
    app.get('/api/restaurants/:id', restaurants.getRestaurantById);
    app.post('/api/restaurants/search/', restaurants.search);
    app.post('/api/restaurants', restaurants.createRestaurant);
    app.put('/api/restaurants', restaurants.updateRestaurant);
    app.delete('/api/restaurants/:id', restaurants.deleteRestaurantById);
    // end of routes for restorent search.



    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.all('/api/*', function (req, res) {
        res.send(404);
    });

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}