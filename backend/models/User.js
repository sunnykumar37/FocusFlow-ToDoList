const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: false // Optional because of Google Auth
    },
    googleId: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
