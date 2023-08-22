const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tidelevelSchema = new Schema({
    t: Date,
    v: Number
});

const Tidelevel = mongoose.model('Tidelevel', tidelevelSchema);
module.exports = Tidelevel;