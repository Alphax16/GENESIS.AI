"use client";
import axios from "axios";

const serverRoute = `api/v1`
// console.log('process.env:', process.env);
console.log(`Server Base URL: ${process.env.NEXT_PUBLIC_SERVER_BASE_URL}\nServer Port: ${process.env.NEXT_PUBLIC_SERVER_PORT}`);
const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/${serverRoute}`;

console.log('Server URL: ', serverUrl);

// Set config defaults when creating the instance
const instance = axios.create({
    // baseURL: serverUrl,
    baseURL: `/${serverRoute}`,
  });
  
//   // Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance;
