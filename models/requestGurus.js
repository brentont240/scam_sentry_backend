const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const guruSchema = new Schema({
    submissionTime: Date,   
    website: { type: String, required: false },
    guru_name: { type: String, required: false }
});

module.exports = mongoose.model('Request_Gurus', guruSchema);
