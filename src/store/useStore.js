import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      token: null,
      
      // App state
      darkMode: false,
      currentTool: null,
      
      // Actions
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
      setDarkMode: (darkMode) => set({ darkMode }),
      setCurrentTool: (tool) => set({ currentTool: tool }),
      
      // Usage tracking
      usage: {},
      incrementUsage: (tool) => {
        const { usage } = get()
        set({ 
          usage: { 
            ...usage, 
            [tool]: (usage[tool] || 0) + 1 
          } 
        })
      }
    }),
    {
      name: 'ethio-gpt-storage',
    }
  )
)
