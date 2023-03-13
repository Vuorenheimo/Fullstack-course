import { useState, useEffect } from 'react';
import database from './services/post-request';

const SearchResults = ({ persons, search }) => {
  const searchToLowerCase = search.toLocaleLowerCase();
  const results = persons.filter(person => 
    person.name.toLocaleLowerCase().includes(searchToLowerCase));

  return (
    <>
    { results.map(person => 
      <div key={ person.id }>{ person.name } { person.number }</div>
      ) 
    }
    </>
  );
}

const AddPerson = ({ name, number, addName, handleName, handleNumber }) => {
  return (
    <form onSubmit={ addName }>
        <div>
          name: <input 
          value={ name }
          onChange={ handleName }
          required />
        </div>

        <div>
          number: <input
          value={ number }
          onChange={ handleNumber }
          required />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
  );
}

const Filter = ({ search, handleSearch }) => {
  return (
    <div>
        filter shown with <input
        value={ search }
        onChange={ handleSearch } />
    </div>
  );
}

const App = () => {
  
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name);

    if (!names.includes(newName)) {
      const newPerson = { name: newName, number: newNumber }

      database.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.log(error);
      });
      
    } else {
      alert(`${ newName } is already added to phonebook`);
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
  
    database.getAll()
    .then(response => setPersons(response))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={ search } handleSearch={handleSearchChange} />

      <h3>add a new</h3>

      <AddPerson name={ newName } number={ newNumber } 
      handleName={ handleNameChange } handleNumber={ handleNumberChange }
      addName={ addName } />

      <h3>Numbers</h3>

      <SearchResults persons={ persons } search={ search }/>
    </div>
  )
}

export default App;