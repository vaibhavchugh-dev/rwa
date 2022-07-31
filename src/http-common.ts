
import axios from "axios";
 




const api = axios.create({
  baseURL: 'https://main.d1io94l3571hcj.amplifyapp.com/api',
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