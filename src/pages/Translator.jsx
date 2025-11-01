import React, { useState } from 'react'
import { Languages, ArrowLeftRight } from 'lucide-react'
import { api } from '../utils/api'

const Translator = () => {
  const [text, setText] = useState('')
  const [translated, setTranslated] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('am')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'am', name: 'Amharic' },
    { code: 'ti', name: 'Tigrinya' },
    { code: 'fr', name: 'French' },
    { code: 'ar', name: 'Arabic' },
    { code: 'es', name: 'Spanish' },
    { code: 'om', name: 'Oromo' },
    { code: 'so', name: 'Somali' },
  ]

  const translateText = async () => {
    if (!text.trim()) {
      setError('Please enter text to translate')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await api.translate(text, targetLang, sourceLang)
      setTranslated(response.translated_text)
    } catch (err) {
      setError('Translation failed. Please try again.')
      console.error('Translation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const swapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setText(translated)
    setTranslated(text)
    setError('')
  }

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy)
  }

  const clearText = () => {
    setText('')
    setTranslated('')
    setError('')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Languages className="w-8 h-8 text-ethio-green" />
          <h1 className="text-3xl font-bold text-gray-900">AI Translator</h1>
        </div>
        <p className="text-gray-600">
          Translate text between multiple languages with AI-powered accuracy. Supports Ethiopian languages.
        </p>
      </div>

      {/* Language Selector */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className="flex-1 max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From
          </label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green focus:border-transparent"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end pb-4">
          <button
            onClick={swapLanguages}
            className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white shadow-sm"
            title="Swap languages"
          >
            <ArrowLeftRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To
          </label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green focus:border-transparent"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Source Text */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Source Text ({languages.find(l => l.code === sourceLang)?.name})
            </label>
            <button
              onClick={clearText}
              className="text-sm text-ethio-green hover:text-green-700 transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                setError('')
              }}
              placeholder={`Enter text in ${languages.find(l => l.code === sourceLang)?.name}...`}
              className="w-full h-64 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green focus:border-transparent resize-none"
              disabled={loading}
            />
            {text && (
              <button
                onClick={() => copyToClipboard(text)}
                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Copy text"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            )}
          </div>
          <div className="text-sm text-gray-500 text-right">
            {text.length} characters
          </div>
        </div>

        {/* Translated Text */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Translated Text ({languages.find(l => l.code === targetLang)?.name})
            </label>
            {translated && (
              <button
                onClick={() => copyToClipboard(translated)}
                className="text-sm text-ethio-green hover:text-green-700 transition-colors flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </button>
            )}
          </div>
          <div className="w-full h-64 border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ethio-green mb-2"></div>
                <p>Translating...</p>
              </div>
            ) : translated ? (
              <p className="whitespace-pre-wrap text-gray-800">{translated}</p>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>Translation will appear here</p>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500 text-right">
            {translated.length} characters
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="text-center">
        <button
          onClick={translateText}
          disabled={loading || !text.trim()}
          className="bg-ethio-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 mx-auto"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Translating...</span>
            </>
          ) : (
            <>
              <Languages className="w-5 h-5" />
              <span>Translate Text</span>
            </>
          )}
        </button>
      </div>

      {/* Usage Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Translation Tips</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Supports Ethiopian languages: Amharic, Tigrinya, Oromo, Somali</li>
          <li>• For best results, use clear and simple sentences</li>
          <li>• Rate limited to 50 translations per hour</li>
          <li>• Copy results with the copy button</li>
        </ul>
      </div>
    </div>
  )
}

export default Translator
