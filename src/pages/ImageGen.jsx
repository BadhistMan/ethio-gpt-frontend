import React, { useState } from 'react'
import { Image, Download, RefreshCw } from 'lucide-react'
import { api } from '../utils/api'

const ImageGen = () => {
  const [prompt, setPrompt] = useState('')
  const [preset, setPreset] = useState('realistic')
  const [generatedImage, setGeneratedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const presets = [
    { value: 'realistic', label: 'Realistic', description: 'Photorealistic images' },
    { value: 'ghibli', label: 'Ghibli Style', description: 'Studio Ghibli inspired art' },
    { value: 'cartoon', label: 'Cartoon', description: 'Vibrant cartoon style' },
    { value: 'anime', label: 'Anime', description: 'Japanese anime style' },
  ]

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await api.generateImage(prompt, preset)
      setGeneratedImage(response.url)
    } catch (err) {
      setError('Failed to generate image. Please try again.')
      console.error('Image generation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.href = generatedImage
      link.download = `ethio-gpt-image-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Image className="w-8 h-8 text-ethio-green" />
          <h1 className="text-3xl font-bold text-gray-900">AI Image Generator</h1>
        </div>
        <p className="text-gray-600">
          Create stunning images from text descriptions. Choose from different artistic styles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="w-full h-32 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Style Preset
            </label>
            <div className="grid grid-cols-2 gap-3">
              {presets.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPreset(p.value)}
                  className={`p-3 border-2 rounded-lg text-left transition-colors ${
                    preset === p.value
                      ? 'border-ethio-green bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{p.label}</div>
                  <div className="text-sm text-gray-500">{p.description}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="w-full bg-ethio-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Image className="w-5 h-5" />
            )}
            <span>{loading ? 'Generating...' : 'Generate Image'}</span>
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Generated Image
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 bg-gray-50 flex items-center justify-center">
            {loading ? (
              <div className="text-center">
                <RefreshCw className="w-12 h-12 text-gray-400 animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Generating your image...</p>
              </div>
            ) : generatedImage ? (
              <div className="relative w-full h-full">
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full h-full object-contain rounded-lg"
                />
                <button
                  onClick={downloadImage}
                  className="absolute bottom-4 right-4 bg-ethio-green text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Your generated image will appear here</p>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-500">
            <p>• Rate limited to 10 images per hour</p>
            <p>• Image generation may take 10-30 seconds</p>
            <p>• Images are automatically deleted after 1 hour</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGen
