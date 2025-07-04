import { clientFetch } from '../clientFetch'

export const TOKEN_KEY = 'token'

class AuthService {
  #token = null

  isLoggedIn() {
    return Boolean(this.#token)
  }

  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
    clientFetch.defaults.headers.common['Authorization'] = `Bearer ${token}`
    this.#token = token
  }

  clearToken() {
    localStorage.removeItem(TOKEN_KEY)
    clientFetch.defaults.headers.common = {}
    this.#token = null
  }

  async login(body) {
    const { data } = await clientFetch.post('/user/login', body)
    const { accessToken } = data
    this.setToken(accessToken)
  }

  async registerUser(body) {
    const { data } = await clientFetch.post('/user/register', body)
    const { accessToken } = data
    this.setToken(accessToken)
  }

  async logout() {
    await clientFetch.get('/user/logout')
    this.clearToken()
  }

  async refresh() {
    const { data } = await clientFetch.get('/user/refresh')
    const { accessToken } = data
    this.setToken(accessToken)
  }
}

export const authService = new AuthService()
