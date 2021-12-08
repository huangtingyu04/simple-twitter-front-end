import axios from 'axios'

const baseURL = 'http://twitter-api-2021-teamchris.herokuapp.com/api'

export const apiHelper = axios.create({ baseURL })

apiHelper.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if(token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)