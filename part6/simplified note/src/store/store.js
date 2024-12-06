import { configureStore } from '@reduxjs/toolkit'
import noteService from '../services/notes'
import noteReducer, { setNotes } from '../reducers/noteReducer'
import filterReducer from '../reducers/filterReducer'


const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

noteService.getAll().then(notes => 
  store.dispatch(setNotes(notes))
)

export default store