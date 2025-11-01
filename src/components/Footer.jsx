import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-ethio-green rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">ET</span>
              </div>
              <span className="font-bold text-lg">Ethio GPT Tools</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Free AI tools hub for the Ethiopian community. Chat, generate images, 
              translate text, convert speech, and create content with powerful AI models.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/chat" className="hover:text-white">AI Chat</a></li>
              <li><a href="/image" className="hover:text-white">Image Generator</a></li>
              <li><a href="/translate" className="hover:text-white">Translator</a></li>
              <li><a href="/write" className="hover:text-white">AI Writer</a></li>
              <li><a href="/resume" className="hover:text-white">Resume Builder</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2024 Ethio GPT Tools. Built with ❤️ for Ethiopia.</p>
          <p className="text-sm mt-2">
            Powered by Hugging Face & Open Source AI Models
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
