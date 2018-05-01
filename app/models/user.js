var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// User schema.
// User has various attributes.
// When a new user is created, they have 1 experience point,
// they do 20 damage, they have 100 coins and
// their wins/ losses are set to 0.
var UserSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    type: {
        type: String,
        required: true
    },
    damage: {
        type: Number,
        min: 1,
        max: 100,
        default: 5
    },
    health: {
        type: Number,
        min: 0,
        max: 100,
        default: 100
    },
    exp: {
        type: Number,
        max: 1000,
        default: 1
    },
    coins: {
        type: Number,
        min: 0,
        default: 100
    },
    wins: {
        type: Number,
        min: 0,
        default: 0
    },
    losses: {
        type: Number,
        min: 0,
        default: 0
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

// hash the password before the user is saved
UserSchema.pre('save', function (next) {
    var user = this;

    // hash the password only if the password has been changed or user is new
    if (!user.isModified('password')) return next();

    // generate the hash
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);

        // change the password to the hashed version
        user.password = hash;
        next();
    });
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function (password) {
    var user = this;

    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);