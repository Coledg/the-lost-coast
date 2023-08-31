import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tidelevelSchema = new Schema({
    t: Date,
    v: Number
});

export const Tidelevel = mongoose.model('Tidelevel', tidelevelSchema);
