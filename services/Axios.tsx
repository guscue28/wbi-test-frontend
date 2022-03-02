import axios from 'axios';
export const baseURL = 'http://localhost:4000'
export const $axios = axios.create({
  baseURL,
})