import { useState, useEffect } from 'react';
import axios from 'axios';
import Content from './Components/Content';
import Filter from './Components/Filter';
import './style.css'


const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        console.log('promise fulfilled')
        setAllCountries(response.data)
      });
  }, []);

  const handleFilterChange = (event) => {
    const filter = event.target.value
    setNewFilter(filter)
    
    if (filter) {
      const regex = new RegExp(filter, 'i')
      const filteredCountries = allCountries.filter((country) =>
        country.name.common.match(regex) 
      );
      setCountries(filteredCountries)
    } else {
      setCountries([]);
    }
  };

  return (
    <div className='container'>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Content countries={countries} setCountries={setCountries} />
    </div>
  );
};

export default App;
