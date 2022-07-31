
import axios from "axios";
 




const api = axios.create({
  baseURL: 'https://localhost:44393/api',
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data);
    },
  ],
});

 

export default api;