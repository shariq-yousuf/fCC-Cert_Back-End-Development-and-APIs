require("dotenv").config()
const { connect, Schema, Model, model } = require("mongoose")

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: { type: [String], default: undefined },
})

let Person = model("Person", personSchema)

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Shariq Yousuf",
    age: 27,
    favoriteFoods: ["Biryani", "Qorma", "IceCream"],
  })

  person.save((err, data) => {
    if (err) return done(err)

    console.log(data)
    done(null, data)
  })
}
const createManyPeople = async (arrayOfPeople, done) => {
  const documents = await Person.create(arrayOfPeople)
  console.log(documents)
  done(null, documents)
}

const findPeopleByName = async (personName, done) => {
  const people = await Person.find({ name: personName })
  console.log(people)
  done(null, people)
}

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: { $in: [food] } }).then((data) => {
    console.log(data)
    done(null, data)
  })
}

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    console.log(data)
    done(null, data)
  })
}

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger"
  Person.findById(personId, (err, doc) => {
    // console.log(doc)
    doc.favoriteFoods.push(foodToAdd)

    doc.save((err, data) => {
      if (err) return done(err)

      console.log(data)
      done(null, data)
    })
  })
}

const findAndUpdate = (personName, done) => {
  const ageToSet = 20
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }
  ).then((data) => {
    console.log(data)
    done(null, data)
  })
}

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId).then((data) => {
    console.log(data)
    done(null, data)
  })
}

const removeManyPeople = (done) => {
  const nameToRemove = "Mary"
  Person.remove({ name: nameToRemove }, (err, data) => {
    console.log(data)
    done(null, data)
  })
}

const queryChain = (done) => {
  const foodToSearch = "burrito"

  Person.find({ favoriteFoods: { $in: [foodToSearch] } })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return done(err)
      console.log(data)
      done(null, data)
    })
}

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person
exports.createAndSavePerson = createAndSavePerson
exports.findPeopleByName = findPeopleByName
exports.findOneByFood = findOneByFood
exports.findPersonById = findPersonById
exports.findEditThenSave = findEditThenSave
exports.findAndUpdate = findAndUpdate
exports.createManyPeople = createManyPeople
exports.removeById = removeById
exports.removeManyPeople = removeManyPeople
exports.queryChain = queryChain
