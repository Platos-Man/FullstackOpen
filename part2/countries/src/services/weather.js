import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/onecall?";

const api_key = process.env.REACT_APP_API_KEY;
console.log(api_key);

const get = (lat, lon) => {
  //   const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}`);
  const request = axios.get(
    "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9fe59b5c57145e570c9d913415a12952"
  );
  return request.then((response) => response.data);
};

const exportMethdods = { get };
export default exportMethdods;
