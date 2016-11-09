var Books = require('mongoose').model('Book');

exports.getBooks = function(req, res) {
    Books.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};

exports.getBookById = function(req, res) {
    Books.findOne({ _id: req.params.id }).exec(function(err, book) {
        res.send(book);
    })
}

exports.createBook = function(req, res, next) {
    var updateDoc = req.body;
    Books.create(updateDoc, function(err, doc) {
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
};
exports.updateBook = function(req, res, next) {
  var itemId = req.body._id;
    delete req.body._id;
    Books.findOneAndUpdate({_id : itemId}, { $set: req.body }, function(err, doc) {
        if (err) { res.status(400);
            return res.send({ reason: err.toString() }); }
        res.send(doc);
    });
}

exports.deleteBookById = function(req, res) {
    Books.remove({ _id: req.params.id }, function(err, book) {
        res.send(book);
    })
}

exports.search = function(req, res) {
    Books.find({title: req.body.searchTerm}, function(err, result){
      res.status(200);
      res.send(result);
    })
}