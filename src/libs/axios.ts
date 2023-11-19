import React from 'react'
import axios from 'axios'


export const useAxios =() => {
axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.common['Authorization'] = process.env.AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const  axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
  });

return axiosInstance ; 
}
