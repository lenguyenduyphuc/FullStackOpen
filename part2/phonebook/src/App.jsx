import { useState} from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Person from './Components/Person'
import './AppStyle.css'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')



  const addName = (event) => {
    event.preventDefault()
    //check if the person has already in the phonebook
    console.log(persons)
    if (persons.some(person => person.name === newName)){
        alert(`${newName} is already in the phonebook`)
    } else {
        //Add the new person to the phonebook
        const newPerson = {
            name: newName,
            number: newNum,
            id: persons.length + 1
        }
        console.log(newName)
        setPersons(persons.concat(newPerson))//Add the person to the state
        setNewNum('')
        setNewName('')
        }
    }



  const handleNewName = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  const handleNewNum = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }

  //check if filter is empty. If not empty mean that user has type in filter the array
  const personsToShow = newFilter
    ? persons.filter(person => person.name.includes(newFilter))
    : persons;

  return (
    <div>
        <h2>Phonebook</h2>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} newNum={newNum} handleNameChange={handleNewName} handleNewNum={handleNewNum}/>
      <h2>Numbers</h2>
       <Person personsToShow={personsToShow}/>
    </div>
  )
}

export default App