import axios from 'axios'

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BASEURL
  
})

export default axiosApi
