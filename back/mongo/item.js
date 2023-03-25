var mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    image: { type: String },
    quantity: { type: Number}
}, {
    timestamps: true
});

module.exports = mongoose.model('item', ItemSchema);
