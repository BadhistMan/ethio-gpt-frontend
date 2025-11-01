import React from 'react'
import { Link } from 'react-router-dom'
import { 
  MessageSquare, 
  Image, 
  Languages, 
  Type, 
  FileText,
  Mic,
  MicOff,
  Zap
} from 'lucide-react'
import ToolCard from '../components/ToolCard'

const Home = () => {
  const tools = [
    {
      title: 'AI Chat',
      description: 'Have conversations with AI assistant',
      icon: MessageSquare,
      href: '/chat',
      color: 'blue'
    },
    {
      title: 'Image Generator',
      description: 'Create images from text prompts',
      icon: Image,
      href: '/image',
      color: 'purple'
    },
    {
      title: 'Translator',
      description: 'Translate between multiple languages',
      icon: Languages,
      href: '/translate',
      color: 'green'
    },
    {
      title: 'Text to Speech',
      description: 'Convert text to natural sounding audio',
      icon: Mic,
      href: '/tts',
      color: 'orange'
    },
    {
      title: 'Speech to Text',
      description: 'Transcribe audio to text',
      icon: MicOff,
      href: '/stt',
      color: 'red'
    },
    {
      title: 'AI Writer',
      description: 'Generate content for blogs, social media, and more',
      icon: Type,
      href: '/write',
      color: 'blue'
    },
    {
      title: 'Resume Builder',
      description: 'Create professional resumes with AI',
      icon: FileText,
      href: '/resume',
      color: 'green'
    },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-ethio-green to-blue-600 rounded-3xl text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Ethio GPT Tools
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Free AI Tools Hub for Ethiopia - Powered by Open Source AI
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto opacity-80">
            Access powerful AI tools for chat, image generation, translation, 
            text-to-speech, content creation, and more - completely free for the Ethiopian community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/chat"
              className="bg-white text-ethio-green px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Start Using Tools</span>
            </Link>
            <Link
              to="/account"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-ethio-green transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All-in-One AI Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for content creation, communication, and productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white rounded-3xl py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Built for Ethiopia</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-ethio-green mb-2">100%</div>
              <div className="text-gray-300">Free</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ethio-green mb-2">10+</div>
              <div className="text-gray-300">AI Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ethio-green mb-2">24/7</div>
              <div className="text-gray-300">Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ethio-green mb-2">Open</div>
              <div className="text-gray-300">Source</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
