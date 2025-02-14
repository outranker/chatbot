import axios from 'axios'
import { API_URL } from './endpoint'
import { getSessionId } from './tokens'

const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  maxContentLength: 100000000,
  maxBodyLength: 1000000000,
})

api.interceptors.request.use(
  (config) => {
    config.baseURL = API_URL
    const sessionId = getSessionId()
    if (sessionId) {
      config.headers['Authorization'] = sessionId
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { api }
