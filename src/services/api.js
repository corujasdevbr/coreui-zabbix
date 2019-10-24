
import axios from "axios";
import router from '../routes';

const api = axios.create({
  baseURL: "https://monitor.blocktime.com.br/zabbix/api_jsonrpc.php"
});

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log(error)
    if (error.response.status === 401) {
      router.push({
        path: '/login',
        name: 'login'
      })
    }

    return Promise.reject(error)
  }
)


export default api;