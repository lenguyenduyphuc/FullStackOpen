import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from 'react-redux'

const FilterAnecdote = () => {
  const dispatch = useDispatch()
	
	const handleChange = (event) => {
		dispatch(filterChange(event.target.value))
	}
  return (
    <div>
			Filter:
      <input 
				type='text'
				name='filter'
				onChange={handleChange}
			/>
    </div>
	)
}

export default FilterAnecdote