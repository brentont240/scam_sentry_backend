const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mlmSchema = new Schema({
    company: { type: String, required: true },
    type: { type: String, required: true }
});

module.exports = mongoose.model('Fake_Gurus', mlmSchema);
