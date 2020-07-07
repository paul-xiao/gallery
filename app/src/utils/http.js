import axios from 'axios'

const $http = axios.create({
  baseURL: '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
})

axios.interceptors.request.use(
  (config) => {
    console.log(config.url)

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default $http
