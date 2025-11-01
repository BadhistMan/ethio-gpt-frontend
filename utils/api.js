const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async get(endpoint) {
    return this.request(endpoint)
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: data,
    })
  }

  // Auth endpoints
  async register(username, displayName) {
    return this.post('/register', { username, display_name: displayName })
  }

  async login(username) {
    return this.post('/login', { username })
  }

  async getCurrentUser() {
    return this.get('/me')
  }

  // Tool endpoints
  async chat(input, sessionId = 'default') {
    return this.post('/chat', { input, session_id: sessionId })
  }

  async generateImage(prompt, preset = 'realistic') {
    return this.post('/image', { prompt, preset })
  }

  async translate(text, targetLang, sourceLang = 'en') {
    return this.post('/translate', { text, target_lang: targetLang, source_lang: sourceLang })
  }

  async textToSpeech(text) {
    return this.post('/tts', { text })
  }

  async speechToText(audioFile) {
    const formData = new FormData()
    formData.append('audio', audioFile)
    
    const response = await fetch(`${this.baseUrl}/stt`, {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error('STT request failed')
    }
    
    return response.json()
  }

  async generateContent(type, topic, length = 'medium', tone = 'professional') {
    return this.post('/write', { type, topic, length, tone })
  }

  async generateResumePDF(resumeData) {
    return this.post('/generate_resume', resumeData)
  }
}

export const api = new ApiClient()
