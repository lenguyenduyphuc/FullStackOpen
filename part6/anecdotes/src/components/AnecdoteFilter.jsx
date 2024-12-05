import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from 'react-redux'

const FilterAnecdote = () => {
  const dispatch = useDispatch()
	
	const handleChange = (event) => {
		dispatch(filterChange(event.target.value))
	}

	const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
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