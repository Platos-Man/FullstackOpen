import { useState, useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";

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

const CountryList = ({ newFilter, setNewFilter, show, setShow, country, setCountry, getCountry, setGetCountry }) => {
  const [countries, setCountries] = useState(null);

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getAll().then((initialCountries) => setCountries(initialCountries));
  }, []);
  useEffect(() => {
    if (getCountry !== null) {
      countryService.get(getCountry).then((initialCountry) => setCountry(initialCountry));
    }
  }, [getCountry, setCountry]);

  // useEffect(() => {
  //   if (country !== null) {
  //     weatherService.get(country.latlng[0], country.latlng[1]).then((initialWeather) => setWeather(initialWeather));
  //   }
  // }, [country]);
  if (!countries) {
    return null;
  }
  // console.log(weather);

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(newFilter.toLowerCase());
  });
  if (show) {
    return <Country country={country} />;
  } else if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    if (getCountry !== filteredCountries[0].name.common.toLowerCase()) {
      setGetCountry(filteredCountries[0].name.common.toLowerCase());
    }
    return <Country country={country} />;
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
  const [getCountry, setGetCountry] = useState(null);
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    if (show) {
      setShow(!show);
    }
    if (country !== null) {
      setCountry(null);
    }
    if (getCountry !== null) {
      setGetCountry(null);
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
        getCountry={getCountry}
        setGetCountry={setGetCountry}
      />
    </div>
  );
};

function App() {
  console.log(process.env.REACT_APP_API_KEY);
  return <Countries />;
}

export default App;
