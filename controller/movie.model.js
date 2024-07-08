// movie.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: { type: String, required: true },
  yearOfRelease: { type: Number, required: true }
});

module.exports = mongoose.model('Movie', movieSchema);
