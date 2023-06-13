import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

const api_key = process.env.REACT_APP_API_KEY;

const get = (lat, lon) => {
  const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&APPID=${api_key}`);
  return request.then((response) => response.data);
};

const exportMethdods = { get };
export default exportMethdods;
