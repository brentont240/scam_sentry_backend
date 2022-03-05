const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keywordsSchema = new Schema({
    keyword: { type: String, required: true }
    // quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Email_Keywords', keywordsSchema);
