import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import BattlePage from './pages/BattlePage'

export default function App() {
  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0a0a1a',
            color: '#e2e8f0',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '0.75rem',
          },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/battle/:user1/:user2" element={<BattlePage />} />
      </Routes>
      <Footer />
    </div>
  )
}
