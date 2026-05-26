import { motion } from 'framer-motion'
import { FaGithub, FaHeart } from 'react-icons/fa'
import { GiSwords } from 'react-icons/gi'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <GiSwords className="text-white text-sm" />
            </div>
            <span className="font-bold gradient-text">GitHub Battle</span>
          </Link>

          <p className="text-white/40 text-sm flex items-center gap-1.5">
            Built with <FaHeart className="text-pink-500" /> for the developer community
          </p>

          <div className="flex items-center gap-4 text-sm text-white/40">
            <a
              href="https://docs.github.com/en/rest"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              GitHub API
            </a>
            <span>·</span>
            <span>Data is real-time via GitHub REST API</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
