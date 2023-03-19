import { useState, useEffect } from 'react';
import database from './services/post-request';

const SearchResults = ({ persons, search, handleClick }) => {
  const searchToLowerCase = search.toLocaleLowerCase();
  const results = persons.filter(person => 
    person.name.toLocaleLowerCase().includes(searchToLowerCase));

  return (
    <>
      { results.map(person => 
        <div key={ person.id }>
          { person.name } { person.number } 
          <button onClick={ () => handleClick(person.id) }>
            delete
          </button>
        </div>
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
    const newPerson = { name: newName, number: newNumber };
    const isFound = persons.find(person => person.name === newName)

    if (!isFound) {
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
      const person = persons.find(person => person.name === newName);

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        
        database.update(person.id, newPerson)
        .then(() => {
          database.getAll()
          .then(response => {
            setPersons(response);
            setNewName('');
            setNewNumber('');
          })
        })
      }
    }
  }

  const deleteName = (id) => {
    const person = persons.find(person => person.id === id)

    if(window.confirm(`Delete ${person.name}`)) {
      database.remove(id)
      .then(database.getAll()
        .then(response => {
          setPersons(response.filter(person => person.id !== id));
        }));
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

      <SearchResults persons={ persons } search={ search } handleClick={ deleteName }/>
    </div>
  )
}

export default App;