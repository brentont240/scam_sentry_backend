const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mlmSchema = new Schema({
    company: { type: String, required: true },
    type: { type: String, required: false }
});

module.exports = mongoose.model('Mlms', mlmSchema);
