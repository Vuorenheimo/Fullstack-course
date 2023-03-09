import { useState } from 'react';

const SearchResults = ({ persons, search }) => {
  const searchToLowerCase = search.toLocaleLowerCase();
  const results = persons.filter(person => 
    person.name.toLocaleLowerCase().includes(searchToLowerCase)
    );
  console.log(results);

  return (
    <>
    {results.map(person => 
      <div key={person.name}>{person.name} {person.number}</div>)}
    </>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name);
    console.log(names);

    if (!names.includes(newName)) {
      setPersons(persons.concat({
        name: newName,
        number: newNumber
      }));
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} is already added to phonebook`);
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

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with <input
        value={ search }
        onChange={handleSearchChange} />
      </div>

      <h2>add a new</h2>

      <form onSubmit={addName}>
        <div>
          name: <input 
          value={ newName }
          onChange={handleNameChange}
          required />
        </div>

        <div>
          number: <input
          value={ newNumber }
          onChange={handleNumberChange}
          required />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      <SearchResults persons={ persons } search={ search }/>
    </div>
  )
}

export default App;