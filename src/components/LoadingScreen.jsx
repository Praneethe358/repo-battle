import { motion } from 'framer-motion'
import { GiSwords } from 'react-icons/gi'

function SkeletonCard() {
  return (
    <div className="glass-card p-6 w-full max-w-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="skeleton w-16 h-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-32 rounded" />
          <div className="skeleton h-3 w-24 rounded" />
        </div>
      </div>
      <div className="space-y-3">
        {[80, 60, 90, 50, 70].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="skeleton h-3 w-20 rounded" />
            <div className={`skeleton h-3 rounded`} style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LoadingScreen() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-12 px-4">
      {/* Pulsing VS logo */}
      <div className="flex items-center gap-8">
        <SkeletonCard />

        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 5, -5, 0],
              filter: [
                'drop-shadow(0 0 10px rgba(245,158,11,0.5))',
                'drop-shadow(0 0 30px rgba(245,158,11,0.9))',
                'drop-shadow(0 0 10px rgba(245,158,11,0.5))',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <GiSwords className="text-amber-400 text-5xl" />
          </motion.div>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-amber-400 font-black text-2xl tracking-widest vs-glow"
          >
            VS
          </motion.span>
        </div>

        <SkeletonCard />
      </div>

      {/* Loading text */}
      <div className="text-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="text-white/60 text-sm font-medium tracking-wider uppercase"
        >
          Fetching battle data from GitHub...
        </motion.div>
        <div className="flex justify-center gap-1.5 mt-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
              animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
