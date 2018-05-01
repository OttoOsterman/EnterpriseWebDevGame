var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// weapon schema
var WeaponSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    damage: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Weapon', WeaponSchema);