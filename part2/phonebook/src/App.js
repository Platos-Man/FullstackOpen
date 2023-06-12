import { useState, useEffect } from "react";
import contactService from "./services/contacts";

const checkDuplicate = (list, element) => list.includes(element);

const Person = ({ name, number, id, setPersons, persons }) => {
  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      contactService.remove(id).then(() => {
        setPersons(persons.filter((person) => id !== person.id));
      });
    }
  };

  return (
    <div key={name}>
      {name} {number}
      <button onClick={() => removePerson(id)}>delete</button>
    </div>
  );
};

const ListPersons = ({ persons, setPersons }) =>
  persons.map((person) => (
    <Person
      key={person.id}
      name={person.name}
      number={person.number}
      id={person.id}
      setPersons={setPersons}
      persons={persons}
    />
  ));

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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const hook = () => {
    contactService.getAll().then((initialContacts) => setPersons(initialContacts));
  };
  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const personList = persons.map((person) => person.name);
    if (checkDuplicate(personList, newPerson.name)) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find((person) => person.name === newPerson.name);
        const changedPerson = { ...person, number: newPerson.number };
        const id = person.id;
        contactService.update(id, changedPerson).then((returnedPerson) => {
          setPersons(persons.map((person) => (person.id !== id ? person : returnedPerson)));
        });
      }
    } else {
      contactService.create(newPerson).then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()));

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
      <ListPersons persons={filteredPersons} setPersons={setPersons} />
    </div>
  );
};

export default App;
