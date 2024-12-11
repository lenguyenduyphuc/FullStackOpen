import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResource] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResource((response.data) ? response.data : [])
    return response.data
  }

  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    setResource(prevResources => [...prevResources, response.data])
    return response.data
  }

  const service = {
    create
  }

  useEffect(() => {
    getAll()
  }, [baseUrl])

  return [resources, service]
}