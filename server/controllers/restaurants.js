var Restaurants = require('mongoose').model('Restaurant');

exports.getRestaurants = function(req, res) {
    Restaurants.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};

exports.getRestaurantById = function(req, res) {
    Restaurants.findOne({ _id: req.params.id }).exec(function(err, book) {
        res.send(book);
    })
}

exports.createRestaurant = function(req, res, next) {
    var updateDoc = req.body;
    Restaurants.find({ title: req.body.title }, function(err, doc) {
        if (doc.length === 0) {
            Restaurants.create(updateDoc, function(err, doc) {
                if (err) {
                    if (err.toString().indexOf('E11000') > -1) {
                        err = new Error('Duplicate Book Name');
                    }
                    res.status(400);
                    return res.send({ reason: err.toString() });
                } else {
                    doc._id = doc._id;
                    res.send(doc);
                }
            });
        }
        else{
            res.status(400);
            res.send("Name is alredy taken");
        }

    })

};
exports.updateRestaurant = function(req, res, next) {
    var itemId = req.body._id;
    delete req.body._id;
    Restaurants.findOneAndUpdate({ _id: itemId }, { $set: req.body }, function(err, doc) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(doc);
    });
}

exports.deleteRestaurantById = function(req, res) {
    Restaurants.remove({ _id: req.params.id }, function(err, doc) {
        res.send(doc);
    })
}

exports.search = function(req, res) {
    Restaurants.find({ location: req.body.location }, function(err, result) {
        res.status(200);
        res.send(result);
    })
}
