import React from 'react'
import { MessageSquare } from 'lucide-react'
import ChatBox from '../components/ChatBox'

const Chat = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <MessageSquare className="w-8 h-8 text-ethio-green" />
          <h1 className="text-3xl font-bold text-gray-900">AI Chat Assistant</h1>
        </div>
        <p className="text-gray-600">
          Have conversations with our AI assistant. Perfect for questions, creative writing, and more.
        </p>
      </div>

      <ChatBox />
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Note: Conversations are not saved permanently. Rate limited to 20 requests per hour.</p>
      </div>
    </div>
  )
}

export default Chat
