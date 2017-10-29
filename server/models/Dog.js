const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let DogModel = {};

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  age: {
    type: Number,
    require: true,
    min: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Based off of the example given @ http://mongoosejs.com/docs/api.html#document-js
// the schema followed by .static adds a static, rather than
// directly adding the static to the list (.statics._____)
DogSchema.static('findByName', (name, callback) => {
  const search = { name };
  return DogModel.findOne(search, callback);
});

DogModel = mongoose.model('Dog', DogSchema);

module.exports = {
  DogModel,
  DogSchema,
};
