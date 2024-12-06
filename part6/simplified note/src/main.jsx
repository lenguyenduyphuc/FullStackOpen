import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'
import App from './App'

import noteService from './services/notes'
import noteReducer, { setNotes} from './reducers/noteReducer'


const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

// console.log(store.getState())

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))
noteService.getAll().then(notes => 
  store.dispatch(setNotes(notes))
) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <Provider store={store}>
//       <div />
//     </Provider>
//   )