import axios from "axios";

const api = axios.create({
   baseURL:'https://www.bitmex.com/api/v1/trade',
   headers : {'Content-Type':'application/json'},
});

export default api
