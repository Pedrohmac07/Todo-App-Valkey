import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  withCredentials: true,
})

console.log('BASE URL:', import.meta.env.VITE_API_BASEURL)
