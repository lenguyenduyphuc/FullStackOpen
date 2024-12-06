import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const newObject = { content, filter: null}
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default {
  getAll,
  create,
}