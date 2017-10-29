// require mongoose, a popular MongoDB library for nodejs
// Mongoose connects in the app.js file. Once mongoose is connected,
// it stays connected across all of the files in this project
// As long as you import this after you have connected,
// then mongoose will give you the active DB connection which is what we want
const mongoose = require('mongoose');

// Set mongoose's Promise to ES6 promises.
// Mongoose prefers its promises features are override with a true promise library.
// This usually means either native ES6 promises or a library like bluebird.
// A promise is an object or construct of future code.
// Basically a promise is a placeholder for something that has not been computed yet.
// Essentially you want to do a task that may take some time. You create a promise.
// Then your code moves on without the promise really doing anything.
// Your code can check to see if the promise has been fulfilled yet. It's possible the
// code in the promise has completed, has not completed or will never complete.
// Based on that, you can make decisions later in code.
// You can also say what to do when the promise completes.
// At first promises may look confusing. Your code creates a promise of code to run, then
// your code moves on doing other stuff. The result of that promise is probably null
// because it has not run yet. At some point in the future, that promise will run,
// and execute the code of the promise.
// For some operations this is completely necessary, such as database i/o.
// Databases are an external application (often not even on the same machine).
// Waiting for the database code to finish is very expensive because you don't know
// when that will ever happen. This means your code might get locked up permanently
// or slowed down (if that machine is overwhelmed). Without promises or threading,
// then your code becomes hyper slow or completely deadlocked waiting for the database
// code to finish. That means your server starts dropping requests or outright failing.
// Promises (and also threads) prevent this from occurring by letting your code continue on
// with the promise that the database code may or may not eventually finish.
// Later in your code, you can check to see which occurred.
mongoose.Promise = global.Promise;

// variable to hold our Model
// A Model is our data structure to handle data. This can be an object, JSON, XML or anything else.
// A mongoDB model is a Mongo database structure with the API attached
// That is, a model has built-in functions for its data structure like find, findOne, etc.
// Usually you will retrieve data from the database through the Model object
let CatModel = {};

// A DB Schema to define our data structure
// The schema really just defines a DB data structure.
// In this case it also defines what functions/methods will be attached to objects that come
// back from the database.
// Schemas also add constraints to the fields so that you can enforce that
// objects have fields of the right type
// This should always be done since it ensures your variables will be the right type and
// it helps prevent injection of invalid data
// Schemas are made in JSON.
// The name of the field will be the variable name for each object
// The json of each field are the constraints around it
// There are many constraints available
// For example,
// type is the data type (String, Number, Date, Boolean, etc).
// required is whether or not the field is required to allow a document to be created
// trim is whether or not the field should strip spaces before and after value
// unique is whether or not the field must be a unique value
// (meaning no two Cat object can have the same value for that field)
// min is the minimum numeric value
// max is the maximum numeric value
// default is the default value if one is not provided
// match is the format to match done through regex
const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  bedsOwned: {
    type: Number,
    min: 0,
    required: true,
  },

  createdData: {
    type: Date,
    default: Date.now,
  },

});

// Schema.statics are static methods attached to the Model or objects
// These DO NOT have their own instance. They are all the static function.
// They do not look at individual instance variables since there is
// no instance of them. Every static function
// only exists once and is called.
CatSchema.statics.sayName = (cat) => {
  console.log(cat.name);
};

// Schema.statics are static methods attached to the Model or objects
// These DO NOT have their own instance. They are all the static function.
// They do not look at individual instance variables since there is
// no instance of them. Every static function
// only exists once and is called.
// In this case, findByName will be attached to the model and objects.
// They will be able to call this function, but they won't be able to
// reference any instance variables of that object (or at least accurately)
// These are used when you want a public function you can call to do a task,
// not a method that uses or returns instance variables
// That is, these are used when you don't need an object, just a function to call.
CatSchema.statics.findByName = (name, callback) => {
  const search = {
    name,
  };

  return CatModel.findOne(search, callback);
};

// Create the cat model based on the schema. You provide it with a custom discriminator
// (the name of the object type. Can be anything)
// and the schema to make a model from.
// Look at the model variable definition above for more details.
CatModel = mongoose.model('Cat', CatSchema);


// export our public properties
module.exports.CatModel = CatModel;
module.exports.CatSchema = CatSchema;
