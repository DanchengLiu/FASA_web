import axios from "axios";

const apiUrl = `${process.env.REACT_APP_SERVER_URL}` +  ":" + `${process.env.REACT_APP_SERVER_PORT}`

console.log(apiUrl);

export const api = axios.create({
    baseURL: apiUrl
});