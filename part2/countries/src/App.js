import { useState, useEffect } from "react";
import countryService from "./services/countries";

const CountrySearch = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      find countries <input value={newFilter} onChange={handleFilterChange}></input>
    </div>
  );
};

const Languages = ({ languages }) => {
  return (
    <div>
      <h3>languages</h3>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
    </div>
  );
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt="flag" />
    </div>
  );
};
const ListedCountry = ({ name, setNewFilter, setGetCountry, setShow }) => {
  return (
    <div key={name}>
      {name}
      <button
        onClick={() => {
          setGetCountry(name.toLowerCase());
          setShow(true);
          setNewFilter(name);
        }}
      >
        show
      </button>
    </div>
  );
};

const CountryList = ({ newFilter, setNewFilter, show, setShow, country, setCountry }) => {
  const [countries, setCountries] = useState(null);
  const [getCountry, setGetCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then((initialCountries) => setCountries(initialCountries));
  }, []);
  useEffect(() => {
    if (getCountry !== null) {
      countryService.get(getCountry).then((initialCountry) => setCountry(initialCountry));
    }
  }, [getCountry, setCountry]);
  if (!countries) {
    return null;
  }

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(newFilter.toLowerCase());
  });
  if (show) {
    return <Country country={country} />;
  } else if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  } else {
    return filteredCountries.map((country) => (
      <ListedCountry
        key={country.name.common}
        name={country.name.common}
        setNewFilter={setNewFilter}
        setGetCountry={setGetCountry}
        setShow={setShow}
      />
    ));
  }
};

const Countries = () => {
  const [newFilter, setNewFilter] = useState("");
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState(null);
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    if (show) {
      setShow(!show);
    }
    if (country !== null) {
      setCountry(null);
    }
  };
  return (
    <div>
      <CountrySearch newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <CountryList
        newFilter={newFilter}
        setNewFilter={setNewFilter}
        show={show}
        setShow={setShow}
        country={country}
        setCountry={setCountry}
      />
    </div>
  );
};

function App() {
  return <Countries />;
}

export default App;
