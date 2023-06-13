import { useState, useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";

function useCountries() {
  const [countries, setCountries] = useState(null);
  useEffect(() => {
    countryService.getAll().then((initialCountries) => setCountries(initialCountries));
  }, []);
  return countries;
}

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

const Country = ({ country, weather }) => {
  if (!country || !weather) {
    return null;
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt="flag" />
      <h2>Weather in {country.capital[0]}</h2>
      <div>temperature {(weather.main.temp - 272.15).toFixed(2)} Celcius</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weatherIcon" />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  );
};
const ListedCountry = ({ name, setNewFilter, setGetCountry, setCountry }) => {
  return (
    <div key={name}>
      {name}
      <button
        onClick={() => {
          setCountry(null);
          setGetCountry(name.toLowerCase());
          setNewFilter(name);
        }}
      >
        show
      </button>
    </div>
  );
};

const CountryList = ({ setNewFilter, country, getCountry, setGetCountry, filteredCountries, weather, setCountry }) => {
  if (getCountry !== null) {
    return <Country country={country} weather={weather} />;
  } else if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else {
    return filteredCountries.map((country) => (
      <ListedCountry
        key={country.name.common}
        name={country.name.common}
        setNewFilter={setNewFilter}
        setGetCountry={setGetCountry}
        setCountry={setCountry}
      />
    ));
  }
};

const Countries = () => {
  const [newFilter, setNewFilter] = useState("");
  const [country, setCountry] = useState(null);
  const [getCountry, setGetCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const countries = useCountries();

  useEffect(() => {
    if (getCountry !== null && country === null) {
      countryService.get(getCountry).then((initialCountry) => setCountry(initialCountry));
    }
    if (country) {
      weatherService.get(country.latlng[0], country.latlng[1]).then((initialWeather) => setWeather(initialWeather));
    }
  }, [getCountry, setCountry, country]);

  if (!countries) {
    return null;
  }

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(newFilter.toLowerCase());
  });
  if (filteredCountries.length === 1 && getCountry !== filteredCountries[0].name.common.toLowerCase()) {
    setGetCountry(filteredCountries[0].name.common.toLowerCase());
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    if (
      (country !== null && filteredCountries.length !== 1) ||
      (country !== null && !country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    ) {
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
        setNewFilter={setNewFilter}
        country={country}
        getCountry={getCountry}
        setGetCountry={setGetCountry}
        filteredCountries={filteredCountries}
        weather={weather}
        setCountry={setCountry}
      />
    </div>
  );
};

function App() {
  return <Countries />;
}

export default App;
