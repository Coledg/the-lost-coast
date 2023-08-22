const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tidelevelSchema = new Schema({
    time: Date,
    level: Number
});

const Tidelevel = mongoose.model('Tidelevel', tidelevelSchema);
module.exports = Tidelevel;