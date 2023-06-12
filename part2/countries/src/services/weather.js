import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/3.0/onecall?";

const api_key = process.env.REACT_APP_API_KEY;
console.log(api_key);

const get = (lat, lon) => {
  const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}`);
  // const request = axios.get("https://api.openweathermap.org/data/3.0/onecall?lat=38.8&lon=12.09&callback=test");
  return request.then((response) => response.data);
};

const exportMethdods = { get };
export default exportMethdods;
