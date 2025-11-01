import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MessageSquare, Image, Languages, Type, FileText, User } from 'lucide-react'
import { useStore } from '../store/useStore'

const Header = () => {
  const location = useLocation()
  const { user, logout } = useStore()

  const navigation = [
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Image Gen', href: '/image', icon: Image },
    { name: 'Translator', href: '/translate', icon: Languages },
    { name: 'AI Writer', href: '/write', icon: Type },
    { name: 'Resume', href: '/resume', icon: FileText },
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-ethio-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">ET</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Ethio GPT Tools</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-ethio-green text-white'
                      : 'text-gray-700 hover:text-ethio-green hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/account"
                  className="flex items-center space-x-2 text-gray-700 hover:text-ethio-green"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{user.display_name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/account"
                className="bg-ethio-green text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
