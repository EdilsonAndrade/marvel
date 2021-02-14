import axios from 'axios';

const mapboxApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
});

export default mapboxApi;
