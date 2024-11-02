import {useState, useEffect} from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Content from './Components/Content'
import personService from './service/person'
import Notification from './Components/Notification'
import './AppStyle.css'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ allPersons, setAllPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
      console.log(initialPersons)
      setAllPersons(initialPersons)
    })
  }, [])

  const addPerson = async (event) => {
    event.preventDefault()
    const person = allPersons.filter((person) =>
        person.name === newName
    )

    const personToAdd = person[0]
    const updatedPerson = { ...personToAdd, number: newNumber}

    if (person.length !== 0){
      if (window.confirm(`${personToAdd.name} is already in the phonebook, would you like to replace ?`)){
        personService
        .update(updatedPerson.id, updatedPerson)
        .then(returnedPerson => {
          setAllPersons(allPersons.map(p => p.id !== personToAdd.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage (
            `${updatedPerson.name} was successfully updated`
          )
          setTimeout(() =>{
            setMessage(null)
          }, 5000)
        })
        .catch(() => {
          setAllPersons(allPersons.filter(person => person.id !== updatedPerson.id))
          setNewName('')
          setNewNumber('')
          setMessage(
            `[ERROR] ${updatedPerson.name} was already deleted from the server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    } else {
      const personToAdd = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personToAdd)
        .then(returnedPerson => {
          setAllPersons(allPersons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            `${personToAdd.name} was added successfully`
          )
          setTimeout(() => {
            setMessage(null)
          },5000)
      })
      .catch((error) => {
        setMessage(
          `[ERROR] ${error.response.data.error}`
        )
        setTimeout(() => {
          setMessage(null)
        },5000)
        console.log(error.response.data)
      })
    }
  }

  
  const handleDeletePerson =(id) => {
    event.preventDefault()
    const filteredPerson = allPersons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Delete ${personName} ?`)){
      personService
      .remove(personId)
      console.log(`${personName} was deleted`)
      setMessage(
        `${personName} deleted`
      )
      setTimeout(() => {
        setMessage(null)
      },5000)
      setAllPersons(allPersons.filter(person => person.id !== personId))
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
    const regex = new RegExp( newFilter, 'i' );
    const filteredPersons = () => allPersons.filter(person => person.name.match(regex))
    setPersons(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Add new person</h2>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Content persons={persons} allPersons={allPersons} deletePerson={handleDeletePerson} />
    </div>
  )
}

export default App