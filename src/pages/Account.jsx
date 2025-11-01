import React, { useState, useEffect } from 'react'
import { User, LogOut, Settings, BarChart3, Calendar, Zap, Shield } from 'lucide-react'
import { useStore } from '../store/useStore'
import { api } from '../utils/api'

const Account = () => {
  const { user, token, setUser, setToken, logout, usage, incrementUsage } = useStore()
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [userStats, setUserStats] = useState(null)

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setDisplayName(user.display_name)
      // Load user stats
      loadUserStats()
    }
  }, [user])

  const loadUserStats = async () => {
    if (user && token) {
      try {
        const stats = {
          joinDate: new Date().toLocaleDateString(),
          totalUsage: Object.values(usage).reduce((sum, count) => sum + count, 0),
          favoriteTool: Object.entries(usage).sort(([,a], [,b]) => b - a)[0]?.[0] || 'None',
          toolsUsed: Object.keys(usage).length
        }
        setUserStats(stats)
      } catch (error) {
        console.error('Error loading user stats:', error)
      }
    }
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    if (!username.trim()) {
      setMessage('Username is required')
      return
    }

    if (username.length < 3) {
      setMessage('Username must be at least 3 characters')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = isLogin 
        ? await api.login(username)
        : await api.register(username, displayName)

      setUser(response.user)
      setToken(response.access_token)
      setMessage(isLogin ? 'Login successful!' : 'Registration successful!')
      
      // Reload stats after auth
      setTimeout(loadUserStats, 1000)
    } catch (error) {
      setMessage(error.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <User className="w-8 h-8 text-ethio-green" />
            <h1 className="text-3xl font-bold text-gray-900">Account</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-ethio-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {user.display_name?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{user.display_name}</h2>
                  <p className="text-gray-600">@{user.username}</p>
                  <p className="text-sm text-gray-500 mt-1">Member since {userStats?.joinDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <BarChart3 className="w-8 h-8 text-ethio-green mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{userStats?.totalUsage || 0}</div>
                  <div className="text-gray-600 text-sm">Total Uses</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Zap className="w-8 h-8 text-ethio-green mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{userStats?.toolsUsed || 0}</div>
                  <div className="text-gray-600 text-sm">Tools Used</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Settings className="w-8 h-8 text-ethio-green mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">7</div>
                  <div className="text-gray-600 text-sm">Available</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Shield className="w-8 h-8 text-ethio-green mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">Active</div>
                  <div className="text-gray-600 text-sm">Status</div>
                </div>
              </div>

              {/* Account Details */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Account Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">User ID:</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {user.id.substring(0, 8)}...
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Username:</span>
                    <span>@{user.username}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Display Name:</span>
                    <span>{user.display_name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Member Since:</span>
                    <span>{userStats?.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Usage Statistics</span>
              </h3>
              
              {Object.keys(usage).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(usage)
                    .sort(([,a], [,b]) => b - a)
                    .map(([tool, count]) => (
                      <div key={tool} className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600 capitalize">{tool.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-semibold">{count} uses</span>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No usage data yet</p>
                  <p className="text-sm">Start using our AI tools to see your statistics here</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-900">Account Status</h3>
              </div>
              <p className="text-green-700 text-sm mb-4">
                Your account is active and in good standing. Enjoy all our free AI tools!
              </p>
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <div className="text-sm text-green-800">
                  <div className="flex justify-between mb-1">
                    <span>Plan:</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.href = '/chat'}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-ethio-green hover:bg-green-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Start Chatting</div>
                  <div className="text-sm text-gray-500">Talk with our AI assistant</div>
                </button>
                
                <button
                  onClick={() => window.location.href = '/image'}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-ethio-green hover:bg-green-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Generate Images</div>
                  <div className="text-sm text-gray-500">Create AI-powered artwork</div>
                </button>
                
                <button
                  onClick={() => window.location.href = '/resume'}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-ethio-green hover:bg-green-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Build Resume</div>
                  <div className="text-sm text-gray-500">Create professional CV</div>
                </button>
              </div>
            </div>

            {/* Logout Section */}
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <h3 className="font-semibold text-lg mb-4">Account Actions</h3>
              <button
                onClick={logout}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-700 text-sm">
                  Need help? Contact our support team for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <User className="w-8 h-8 text-ethio-green" />
          <h1 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h1>
        </div>
        <p className="text-gray-600">
          {isLogin 
            ? 'Sign in to access all AI tools and track your usage' 
            : 'Create an account to get started with our AI tools'
          }
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg border p-6">
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green"
              placeholder="Enter your username"
              minLength={3}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name (Optional)
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ethio-green"
                placeholder="How you want to be called"
              />
            </div>
          )}

          {message && (
            <div className={`p-3 rounded-lg ${
              message.includes('successful') 
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full bg-ethio-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setMessage('')
            }}
            className="text-ethio-green hover:text-green-700 transition-colors"
          >
            {isLogin 
              ? "Don't have an account? Create one" 
              : 'Already have an account? Sign in'
            }
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Simple Authentication</h4>
          <p className="text-blue-700 text-sm">
            We use username-based authentication. No email verification needed.
            Your data is secure and private.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Account
