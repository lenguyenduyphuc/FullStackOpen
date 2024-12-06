import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const createNew = async (content) => {
  const newObject = { 
    content: content,
    id: (100000 * Math.random()).toFixed(0),
    votes: 0
  }
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (content) => {
  console.log(content)
  const response = await axios.put(`${baseUrl}/${content.id}`, content)
  return response.data
}

export default {
  getAll,
  createNew,
  update
}