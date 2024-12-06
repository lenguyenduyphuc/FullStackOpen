import axios from 'axios'

export const getNotes = () => 
  axios.get('http://localhost:3004/notes').then(res => res.data)
