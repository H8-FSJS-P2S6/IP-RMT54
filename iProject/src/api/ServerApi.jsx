import axios from 'axios';

const baseURL = 'https://p2.alifnaufaldo.online/';
// const baseURL = "http://localhost:5173/"
// const baseURL = "http://localhost:3000/"

const serverAPI = axios.create({baseURL});

export default serverAPI;


