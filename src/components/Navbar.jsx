import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaCog, FaTimes, FaKey } from 'react-icons/fa'
import { GiSwords } from 'react-icons/gi'
import toast from 'react-hot-toast'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('gh_token') || '')
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const saveToken = () => {
    if (token.trim()) {
      localStorage.setItem('gh_token', token.trim())
      toast.success('GitHub token saved! Rate limits lifted.')
    } else {
      localStorage.removeItem('gh_token')
      toast('Token cleared. Anonymous mode active.', { icon: '🔓' })
    }
    setShowSettings(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-card border-b border-white/10 py-3 mx-0 rounded-none'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-glow-purple group-hover:scale-110 transition-transform duration-300">
              <GiSwords className="text-white text-lg" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="gradient-text">GitHub</span>
              <span className="text-white/90"> Battle</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-lg"
            >
              <FaGithub className="text-lg" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <button
              onClick={() => setShowSettings(true)}
              id="settings-button"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-all duration-200 hover:bg-white/5 rounded-lg group"
            >
              <FaCog className="group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={(e) => e.target === e.currentTarget && setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="glass-card glow-border-purple p-8 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold gradient-text flex items-center gap-2">
                  <FaCog /> Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-white/50 hover:text-white transition-colors p-1"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
                    <FaKey className="text-accent-amber" />
                    GitHub Personal Access Token
                  </label>
                  <input
                    id="gh-token-input"
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    className="input-field font-mono text-sm"
                  />
                  <p className="text-xs text-white/40 mt-2">
                    Optional — increases rate limit from 60 to 5,000 requests/hour.
                    Token is stored locally in your browser only.
                  </p>
                </div>

                <button
                  onClick={saveToken}
                  id="save-token-button"
                  className="btn-primary w-full"
                >
                  <span>Save Settings</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
