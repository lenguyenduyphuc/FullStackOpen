const mongoose = require('mongoose')

if (process.argv.length<3 && process.argv.length>5){
    console.log('give password,name and number as an argument')
    process.exit(1)
}

//set up the password
const password = process.argv[2]

const url =
 `mongodb+srv://phuc:${password}@cluster0.pezqi.mongodb.net/myDatabase?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

//define schema and person
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}

if (process.argv.length === 3){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
