import { motion } from 'framer-motion'
import { winnerEntrance, staggerContainer, fadeInUp } from '../animations/variants'
import { generateCommentary } from '../utils/commentary'

function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            background: ['#7C3AED', '#06B6D4', '#F59E0B', '#EC4899', '#10B981'][i % 5],
            top: '-10px',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, Math.random() * 720],
            opacity: [1, 0.8, 0],
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            delay: Math.random() * 1.5,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  )
}

export default function WinnerBanner({ profile1, profile2, scores, winner }) {
  const winnerProfile = winner === 'p1' ? profile1 : profile2
  const loserProfile = winner === 'p1' ? profile2 : profile1
  const winnerName = winnerProfile.user.name || winnerProfile.user.login
  const commentary = generateCommentary(profile1, profile2, winner)

  return (
    <motion.div
      variants={winnerEntrance}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-3xl mx-auto overflow-hidden"
    >
      <Confetti />

      <div className="glass-card glow-border-amber p-8 lg:p-12 text-center relative">
        {/* Background trophy glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none rounded-2xl" />

        {/* Trophy */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl mb-4 relative z-10"
        >
          🏆
        </motion.div>

        {/* Winner title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10"
        >
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400/70 mb-2">
            Battle Winner
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-amber-400 text-glow-amber mb-1">
            {winnerName}
          </h2>
          <p className="text-white/40 text-sm font-mono">@{winnerProfile.user.login}</p>
        </motion.div>

        {/* Score display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6 mt-6 mb-8 relative z-10"
        >
          <div className="text-center">
            <div className="text-3xl font-black text-purple-400">{scores.score1}</div>
            <div className="text-xs text-white/40 mt-1 font-mono">{profile1.user.login}</div>
          </div>
          <div className="text-white/20 text-2xl font-light">·</div>
          <div className="text-center">
            <div className="text-xl font-bold text-white/30 uppercase tracking-widest">Score</div>
          </div>
          <div className="text-white/20 text-2xl font-light">·</div>
          <div className="text-center">
            <div className="text-3xl font-black text-cyan-400">{scores.score2}</div>
            <div className="text-xs text-white/40 mt-1 font-mono">{profile2.user.login}</div>
          </div>
        </motion.div>

        {/* Win percentage bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative z-10 mb-8"
        >
          <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden flex">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${scores.pct1}%` }}
              transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-l-full"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${scores.pct2}%` }}
              transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
              className="h-full bg-gradient-to-l from-cyan-600 to-cyan-400 rounded-r-full"
            />
          </div>
          <div className="flex justify-between mt-1.5 text-xs text-white/30">
            <span>{scores.pct1}%</span>
            <span>{scores.pct2}%</span>
          </div>
        </motion.div>

        {/* AI Commentary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative z-10 text-left space-y-3"
        >
          <div className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4 text-center">
            ⚡ Battle Analysis
          </div>
          {commentary.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.15 }}
              className="text-sm text-white/70 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>'),
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
