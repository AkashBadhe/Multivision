var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
    title: { type: String, required: '{PATH} is required!', unique: true },
    description: { type: String },
    rating: { type: Number },
    ratingCount: { type: Number },
    img: { type: String },
    tags: [String],
    comments: [String],
    location: [String]
});
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

function createDefaultRestaurant() {
    Restaurant.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            Restaurant.create({
                title: "Farmer's Choice (Pimple Saudagar)",
                description: "This is best restaurant.",
                rating: 4,
                ratingCount: 300,
                img: 'hotel.png',
                tags: "Biryani, Tanduri",
                comments: ["Great", "Good", "Not Bad"],
                location: ["vishal nagar", "wakad", "hinjewadi"]
            });
        }
    })
}

exports.createDefaultRestaurant = createDefaultRestaurant;
