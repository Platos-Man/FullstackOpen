import { useState, useEffect } from "react";
import contactService from "./services/contacts";

const checkDuplicate = (list, element) => list.includes(element);

const Person = ({ name, number, id, setPersons, persons }) => {
  const removePerson = (id) => {
    contactService.remove(id).then(() => {
      setPersons(persons.filter((person) => id !== person.id));
    });
  };

  return (
    <div key={name} style={{ border: "1px solid blue" }}>
      {name} {number} {id}
      <button onClick={() => removePerson(id)}>delete</button>
    </div>
  );
};

const ListPersons = ({ persons, setPersons }) =>
  persons.map((item) => (
    <Person
      key={item.id}
      name={item.name}
      number={item.number}
      id={item.id}
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
    checkDuplicate(personList, newPerson.name)
      ? alert(`${newPerson.name} is already added to phonebook`)
      : contactService.create(newPerson).then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
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
