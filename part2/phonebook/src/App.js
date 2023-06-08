import { useState } from "react";

const checkDuplicate = (list, element) => list.includes(element);

const Person = person => (
  <div key={person.name}>
    {person.name} {person.number}
  </div>
);

const ListPersons = ({ persons }) => persons.map(Person);

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleFilterChange}></input>
    </div>
  );
};
const AddPerson = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040 - 1234567" },
    { name: "Samimas Santamaamatnas", number: "80085" },
    { name: "AnttiAnttila", number: "52315311" },
    { name: "Pekka Panttila", number: "2152315623" },
    { name: "Pirjo Pönttölä", number: "01525002" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPerson = event => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const personList = persons.map(person => person.name);
    checkDuplicate(personList, newPerson.name)
      ? alert(`${newPerson.name} is already added to phonebook`)
      : setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleFilterChange = event => setNewFilter(event.target.value);
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));
  console.log(newFilter);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <AddPerson
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <ListPersons persons={filteredPersons} />
    </div>
  );
};

export default App;
