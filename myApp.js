require('dotenv').config();

// 1. Install and Setup Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// 2. Create a Model
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model('Person', personSchema);

// 3. Create and Save a Record of a Model
var createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Brian',
    age: 26,
    favoriteFoods: ['Rice', 'Beans', 'Oat'],
  });
  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// 4. Create Many Records with model.create()
const arrayOfPeople = [
  { name: 'Adam', age: 24, favoriteFoods: ['indomie noodle'] },
  { name: 'Sola', age: 36, favoriteFoods: ['roasted yam'] },
  { name: 'Colins', age: 48, favoriteFoods: ['Red wine'] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};

// 5. Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

// 6. Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, singleFood) => {
    if (err) return console.log(err);
    done(null, singleFood);
  });
};

// 7. Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, individual) => {
    if (err) return console.log(err);
    done(null, individual);
  });
};

// 8. Perform Classic Updates by Running Find, Edit, then Save
var findEditThenSave = (personId, done) => {
  var foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key.
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

// 9. Perform New Updates on a Document Using model.findOneAndUpdate()
var findAndUpdate = (personName, done) => {
  let query = { name: personName };
  let update = { age: 20 };
  let option = { new: true };

  Person.findOneAndUpdate(query, update, option, (err, individual) => {
    if (err) return console.log(err);
    done(null, individual);
  });
};

// 10. Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

// 11. Delete Many Documents with model.remove()
var removeManyPeople = (done) => {
  var nameToRemove = 'Mary';

  Person.remove({ name: nameToRemove }, (err, dataToremove) => {
    if (err) return console.log(err);
    done(null, dataToremove);
  });
};

// 12. Chain Search Query Helpers to Narrow Search Results
var queryChain = (done) => {

  Person.find({ favoriteFoods: "burrito" })
    .sort({'name':'asc'})
    .limit(2)
    .select({"age":0})
    .exec((error, searchResults) => {
      done(error, searchResults);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;