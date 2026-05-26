import { motion } from 'framer-motion'
import { FaExclamationTriangle, FaRedo, FaGithub } from 'react-icons/fa'
import { fadeInUp } from '../animations/variants'

export default function ErrorCard({ message, onRetry }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="glass-card border border-red-500/30 p-8 max-w-lg mx-auto text-center"
      style={{ boxShadow: '0 0 30px rgba(239,68,68,0.15)' }}
    >
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
        <FaExclamationTriangle className="text-red-400 text-2xl" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">Battle Interrupted</h3>
      <p className="text-white/60 text-sm mb-6 leading-relaxed">{message}</p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            id="retry-button"
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/20 transition-all duration-200 text-sm font-medium"
          >
            <FaRedo /> Try Again
          </button>
        )}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium"
        >
          <FaGithub /> Verify Username
        </a>
      </div>

      {message?.includes('rate limit') && (
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-400">
          💡 Add a GitHub token in Settings to increase rate limits to 5,000 req/hr
        </div>
      )}
    </motion.div>
  )
}
