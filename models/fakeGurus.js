const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const guruSchema = new Schema({
    websites: { type: Array, required: true },
    guru_name: { type: String, required: true }
});

module.exports = mongoose.model('Fake_Gurus', guruSchema);
