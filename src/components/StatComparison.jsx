import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '../animations/variants'

function StatRow({ stat, idx }) {
  const max = Math.max(stat.val1 || 0, stat.val2 || 0) || 1
  const pct1 = Math.round(((stat.val1 || 0) / max) * 100)
  const pct2 = Math.round(((stat.val2 || 0) / max) * 100)
  const winner1 = stat.val1 > stat.val2
  const winner2 = stat.val2 > stat.val1
  const tie = stat.val1 === stat.val2

  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card p-5 rounded-2xl"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-base font-bold transition-all ${
            winner1 ? 'text-purple-300 text-glow-purple' : 'text-white/60'
          }`}
        >
          {stat.format ? stat.format(stat.val1) : stat.val1?.toLocaleString() ?? '0'}
          {winner1 && !tie && <span className="ml-1 text-xs text-purple-400">✓</span>}
        </span>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-lg">{stat.icon}</span>
          <span className="text-white/50 font-medium text-xs uppercase tracking-wider">
            {stat.label}
          </span>
          {tie && <span className="text-xs text-white/30">tie</span>}
        </div>

        <span
          className={`text-base font-bold transition-all ${
            winner2 ? 'text-cyan-300 text-glow-cyan' : 'text-white/60'
          }`}
        >
          {winner2 && !tie && <span className="mr-1 text-xs text-cyan-400">✓</span>}
          {stat.format ? stat.format(stat.val2) : stat.val2?.toLocaleString() ?? '0'}
        </span>
      </div>

      {/* Dual bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex justify-end">
          <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden w-full flex justify-end">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct1}%` }}
              transition={{ duration: 0.9, delay: 0.1 + idx * 0.05, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                winner1 ? 'bg-gradient-to-l from-purple-500 to-purple-700' : 'bg-purple-900/50'
              }`}
            />
          </div>
        </div>
        <div className="w-2 h-2 rounded-full bg-white/20 flex-shrink-0" />
        <div className="flex-1">
          <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden w-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct2}%` }}
              transition={{ duration: 0.9, delay: 0.1 + idx * 0.05, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                winner2 ? 'bg-gradient-to-r from-cyan-500 to-cyan-700' : 'bg-cyan-900/50'
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function StatComparison({ comparisons }) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold gradient-text mb-2">⚔️ Head-to-Head Stats</h2>
        <p className="text-white/40 text-sm">
          <span className="text-purple-400 font-semibold">Purple</span> vs{' '}
          <span className="text-cyan-400 font-semibold">Cyan</span> — winner highlighted
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {comparisons.map((stat, i) => (
          <StatRow key={stat.label} stat={stat} idx={i} />
        ))}
      </motion.div>
    </div>
  )
}
