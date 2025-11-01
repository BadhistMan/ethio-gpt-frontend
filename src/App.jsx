import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useStore } from './store/useStore'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Chat from './pages/Chat'
import ImageGen from './pages/ImageGen'
import Translator from './pages/Translator'
import Writer from './pages/Writer'
import ResumeBuilder from './pages/ResumeBuilder'
import Account from './pages/Account'

function App() {
  const { user } = useStore()

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/image" element={<ImageGen />} />
            <Route path="/translate" element={<Translator />} />
            <Route path="/write" element={<Writer />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
