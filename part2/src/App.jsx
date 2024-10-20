import Note from './components/Note'

const App = ({notes}) => {

  // const result = notes.map((note,i) => ...)
  // console.log(result)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(notes => 
          <Note key={notes.id} note={notes}/>
        )}
      </ul>
    </div>
  )
}

export default App