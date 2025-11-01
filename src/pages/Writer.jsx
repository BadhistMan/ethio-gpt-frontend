import React, { useState } from 'react'
import { Type, Copy, Download, FileText, MessageSquare, Briefcase, Sparkles } from 'lucide-react'
import { api } from '../utils/api'

const Writer = () => {
  const [topic, setTopic] = useState('')
  const [contentType, setContentType] = useState('blog')
  const [length, setLength] = useState('medium')
  const [tone, setTone] = useState('professional')
  const [generatedContent, setGeneratedContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const contentTypes = [
    { value: 'blog', label: 'Blog Article', icon: FileText, description: 'Long-form articles and blog posts' },
    { value: 'resume', label: 'Resume Summary', icon: Briefcase, description: 'Professional resume summaries' },
    { value: 'cover_letter', label: 'Cover Letter', icon: MessageSquare, description: 'Job application cover letters' },
    { value: 'social', label: 'Social Media Post', icon: Sparkles, description: 'Social media content' },
  ]

  const lengths = [
    { value: 'short', label: 'Short', chars: '100-200 words' },
    { value: 'medium', label: 'Medium', chars: '200-400 words' },
    { value: 'long', label: 'Long', chars: '400-600 words' },
  ]

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'casual', label: 'Casual' },
    { value: 'persuasive', label: 'Persuasive' },
    { value: 'inspirational', label: 'Inspirational' },
  ]

  const generateContent = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic')
      return
    }

    setLoading(true)
    setError('')
    setGeneratedContent('')

    try {
      const response = await api.generateContent(contentType, topic, length, tone)
      setGeneratedContent(response.content)
    } catch (err) {
      setError('Failed to generate content. Please try again.')
      console.error('Content generation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent)
    }
  }

  const downloadContent = () => {
    if (generatedContent) {
      const blob = new Blob([generatedContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `ethio-gpt-${contentType}-${Date.now()}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  const clearAll = () => {
    setTopic('')
    setGeneratedContent('')
    setError('')
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Type className="w-8 h-8 text-ethio-green" />
          <h1 className="text-3xl font-bold text-gray-900">AI Content Writer</h1>
        </div>
        <p className="text-gray-600">
          Generate high-quality content for blogs, resumes, cover letters, and social media with AI assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Content Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Content Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {contentTypes.map((type) => {
                const Icon = type.icon
                const isSelected = contentType === type.value
                
                return (
                  <button
                    key={type.value}
                    onClick={() => setContentType(type.value)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      isSelected
                        ? 'border-ethio-green bg-green-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        isSelected ? 'bg-ethio-green text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{type.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic or Subject *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value)
                setError('')
              }}
              placeholder={
                contentType === 'blog' ? "e.g., How to start a business in Ethiopia" :
                contentType === 'resume' ? "e.g., Software Developer with 3 years experience" :
                contentType === 'cover_letter' ? "e.g., Marketing Manager position at Tech Company" :
                "e.g., New product launch announcement"
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green focus:border-transparent"
            />
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length
              </label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green"
              >
                {lengths.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label} ({l.chars})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green"
              >
                {tones.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={generateContent}
              disabled={loading || !topic.trim()}
              className="flex-1 bg-ethio-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Type className="w-5 h-5" />
                  <span>Generate Content</span>
                </>
              )}
            </button>
            
            <button
              onClick={clearAll}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Generated Content
            </label>
            {generatedContent && (
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadContent}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Download as text file"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg h-96 bg-white shadow-sm">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ethio-green mb-4"></div>
                <p className="text-lg">Generating your content...</p>
                <p className="text-sm mt-2">This may take a few seconds</p>
              </div>
            ) : generatedContent ? (
              <div className="p-6 h-full overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {generatedContent}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Type className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Your generated content will appear here</p>
                  <p className="text-sm mt-2">Fill out the form and click "Generate Content"</p>
                </div>
              </div>
            )}
          </div>

          {/* Usage Tips */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Writing Tips</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Be specific with your topic for better results</li>
              <li>• Choose the appropriate tone for your audience</li>
              <li>• Rate limited to 20 content generations per hour</li>
              <li>• Copy or download your generated content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Writer
