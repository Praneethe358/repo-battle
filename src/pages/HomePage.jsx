import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub, FaSearch, FaBolt, FaStar, FaUsers, FaCode } from 'react-icons/fa'
import { GiSwords } from 'react-icons/gi'
import ParticleBackground from '../components/ParticleBackground'
import { staggerContainer, fadeInUp, scaleIn } from '../animations/variants'

const FEATURES = [
  { icon: <FaStar className="text-amber-400" />, title: 'Star Analysis', desc: 'Compare total repository stars across both profiles' },
  { icon: <FaUsers className="text-purple-400" />, title: 'Follower Wars', desc: 'See who commands the larger developer audience' },
  { icon: <FaCode className="text-cyan-400" />, title: 'Language Dominance', desc: 'Radar charts, pie charts, and language breakdowns' },
  { icon: <FaBolt className="text-pink-400" />, title: 'Activity Score', desc: 'Recent push events and real-time contribution metrics' },
]

const EXAMPLE_BATTLES = [
  { u1: 'torvalds', u2: 'gaearon' },
  { u1: 'sindresorhus', u2: 'tj' },
  { u1: 'addyosmani', u2: 'kentcdodds' },
]

export default function HomePage() {
  const [user1, setUser1] = useState('')
  const [user2, setUser2] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const startBattle = () => {
    const u1 = user1.trim().replace(/^@/, '')
    const u2 = user2.trim().replace(/^@/, '')
    if (!u1 || !u2) {
      setError('Enter both GitHub usernames to start the battle.')
      return
    }
    if (u1.toLowerCase() === u2.toLowerCase()) {
      setError('You cannot battle yourself! Enter two different usernames.')
      return
    }
    setError('')
    navigate(`/battle/${u1}/${u2}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') startBattle()
  }

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-grid opacity-50 pointer-events-none z-0" />

      {/* Hero radial glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, #06B6D4 60%, transparent 100%)' }}
        />
      </div>

      <div className="relative z-10">
        {/* ──────── HERO ──────── */}
        <section className="pt-36 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-purple-500/30 text-sm text-purple-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                Real-time GitHub API — No login required
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="text-white">Battle </span>
                <span className="gradient-text">GitHub</span>
                <br />
                <span className="text-white">Profiles </span>
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-block"
                >
                  ⚔️
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
            >
              Compare developers, repositories, languages, and coding dominance in real time.
              <br className="hidden sm:block" />
              Who claims the throne?
            </motion.p>

            {/* Input area */}
            <motion.div variants={scaleIn} className="glass-card glow-border-purple p-6 sm:p-8 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                {/* User 1 */}
                <div className="flex-1 relative">
                  <FaGithub className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400 text-lg" />
                  <input
                    id="user1-input"
                    type="text"
                    value={user1}
                    onChange={(e) => setUser1(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="torvalds"
                    className="input-field pl-10 border-purple-500/30 focus:border-purple-500/60"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>

                {/* VS divider */}
                <div className="flex sm:flex-col items-center justify-center gap-1 flex-shrink-0">
                  <div className="hidden sm:block h-px w-4 bg-white/20" />
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-amber-400 font-black text-lg vs-glow"
                  >
                    VS
                  </motion.span>
                  <div className="hidden sm:block h-px w-4 bg-white/20" />
                </div>

                {/* User 2 */}
                <div className="flex-1 relative">
                  <FaGithub className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
                  <input
                    id="user2-input"
                    type="text"
                    value={user2}
                    onChange={(e) => setUser2(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="gaearon"
                    className="input-field pl-10 border-cyan-500/30 focus:border-cyan-500/60"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-3 text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                id="start-battle-button"
                onClick={startBattle}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full mt-4 flex items-center justify-center gap-3 text-base py-4"
              >
                <span className="flex items-center gap-3">
                  <GiSwords className="text-xl" />
                  Start Battle
                  <GiSwords className="text-xl scale-x-[-1]" />
                </span>
              </motion.button>

              {/* Quick battles */}
              <div className="mt-5 pt-5 border-t border-white/[0.06]">
                <div className="text-xs text-white/30 mb-3 uppercase tracking-wider">Quick battles</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {EXAMPLE_BATTLES.map((b) => (
                    <motion.button
                      key={`${b.u1}-${b.u2}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/battle/${b.u1}/${b.u2}`)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 font-mono"
                    >
                      {b.u1} vs {b.u2}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ──────── FEATURES ──────── */}
        <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="glass-card p-5 hover:border-white/15 transition-all duration-300 group"
              >
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {f.icon}
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ──────── STATS STRIP ──────── */}
        <section className="py-10 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass-card p-6 flex flex-wrap justify-around gap-6 text-center"
          >
            {[
              { val: '100%', label: 'Real-Time Data' },
              { val: '60+', label: 'Stats Analyzed' },
              { val: '0', label: 'Login Required' },
              { val: '∞', label: 'Battles Available' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black gradient-text">{s.val}</div>
                <div className="text-xs text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  )
}
