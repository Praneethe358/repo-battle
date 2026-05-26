import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { slideInLeft, slideInRight, staggerContainer, fadeInUp } from '../animations/variants'
import { FaStar, FaCodeBranch, FaUsers, FaUserFriends, FaMapMarkerAlt, FaBuilding, FaLink, FaExternalLinkAlt } from 'react-icons/fa'
import { formatNumber, formatDate, getLanguageColor } from '../utils/formatters'
import { getBadges } from '../utils/commentary'

function AnimatedCounter({ target, duration = 1500 }) {
  const [count, setCount] = useState(0)
  const start = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    start.current = null
    const animate = (ts) => {
      if (!start.current) start.current = ts
      const elapsed = ts - start.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return <>{count.toLocaleString()}</>
}

export default function BattleCard({ profile, side, isWinner }) {
  const { user, stats } = profile
  const badges = getBadges(profile)
  const topLangs = Object.entries(stats.languageMap || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  const totalLangRepos = topLangs.reduce((s, [, c]) => s + c, 0)

  const animation = side === 'left' ? slideInLeft : slideInRight

  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="visible"
      className={`glass-card p-6 lg:p-8 w-full relative overflow-hidden flex flex-col gap-6 ${
        isWinner ? 'glow-border-amber' : side === 'left' ? 'glow-border-purple' : 'glow-border-cyan'
      }`}
    >
      {/* Winner crown */}
      {isWinner && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="absolute top-4 right-4 text-2xl"
        >
          👑
        </motion.div>
      )}

      {/* Ambient glow overlay */}
      <div
        className={`absolute -top-10 ${side === 'left' ? '-left-10' : '-right-10'} w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none`}
        style={{
          background: isWinner ? '#F59E0B' : side === 'left' ? '#7C3AED' : '#06B6D4',
        }}
      />

      {/* Profile Header */}
      <div className="flex items-start gap-4 relative z-10">
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          <motion.img
            src={user.avatar_url}
            alt={user.login}
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`w-20 h-20 rounded-2xl object-cover border-2 ${
              isWinner ? 'border-amber-400/60' : side === 'left' ? 'border-purple-500/60' : 'border-cyan-500/60'
            } shadow-lg`}
          />
        </a>
        <div className="flex-1 min-w-0">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 group"
          >
            <h2 className="text-xl font-bold text-white group-hover:underline truncate">
              {user.name || user.login}
            </h2>
            <FaExternalLinkAlt className="text-white/30 text-xs flex-shrink-0 group-hover:text-white/60 transition-colors" />
          </a>
          <p className="text-sm font-mono text-white/50">@{user.login}</p>
          {user.bio && (
            <p className="text-xs text-white/60 mt-1.5 leading-relaxed line-clamp-2">{user.bio}</p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            {user.location && (
              <span className="flex items-center gap-1 text-xs text-white/40">
                <FaMapMarkerAlt className="text-pink-400/70" /> {user.location}
              </span>
            )}
            {user.company && (
              <span className="flex items-center gap-1 text-xs text-white/40">
                <FaBuilding className="text-cyan-400/70" /> {user.company}
              </span>
            )}
            {user.blog && (
              <a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-white/40 hover:text-cyan-400 transition-colors"
              >
                <FaLink className="text-cyan-400/70" />
                <span className="truncate max-w-[100px]">{user.blog}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        {[
          { icon: <FaUsers />, label: 'Followers', val: user.followers },
          { icon: <FaUserFriends />, label: 'Following', val: user.following },
          { icon: '📦', label: 'Repos', val: user.public_repos },
          { icon: <FaStar />, label: 'Stars', val: stats.totalStars },
          { icon: <FaCodeBranch />, label: 'Forks', val: stats.totalForks },
          { icon: '⚡', label: 'Activity/30d', val: stats.recentActivity },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.07 }}
            className="bg-white/[0.04] rounded-xl px-3 py-3 flex items-center gap-2.5"
          >
            <span className={`text-sm ${side === 'left' ? 'text-purple-400' : 'text-cyan-400'}`}>
              {s.icon}
            </span>
            <div>
              <div className="text-xs text-white/40 leading-none">{s.label}</div>
              <div className="text-sm font-bold text-white mt-0.5">
                <AnimatedCounter target={s.val || 0} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Languages */}
      {topLangs.length > 0 && (
        <div className="relative z-10">
          <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
            🌐 Top Languages
          </div>
          <div className="space-y-2">
            {topLangs.map(([lang, count], i) => {
              const pct = Math.round((count / totalLangRepos) * 100)
              return (
                <div key={lang}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: getLanguageColor(lang) }}
                      />
                      <span className="text-white/70 font-medium">{lang}</span>
                    </span>
                    <span className="text-white/40">{pct}%</span>
                  </div>
                  <div className="stat-bar-track">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                      className={side === 'left' ? 'stat-bar-fill-left' : 'stat-bar-fill-right'}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Top Repo */}
      {stats.topRepo && (
        <motion.a
          href={stats.topRepo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="relative z-10 block bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl p-4 transition-all duration-200 group"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-xs text-white/40 mb-1">🏆 Top Repository</div>
              <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                {stats.topRepo.name}
              </div>
              {stats.topRepo.description && (
                <div className="text-xs text-white/50 mt-1 line-clamp-1">
                  {stats.topRepo.description}
                </div>
              )}
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                <FaStar className="text-xs" />
                {formatNumber(stats.topRepo.stargazers_count)}
              </span>
              {stats.topRepo.language && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: `${getLanguageColor(stats.topRepo.language)}22`,
                    color: getLanguageColor(stats.topRepo.language),
                    border: `1px solid ${getLanguageColor(stats.topRepo.language)}44`,
                  }}
                >
                  {stats.topRepo.language}
                </span>
              )}
            </div>
          </div>
        </motion.a>
      )}

      {/* Badges */}
      {badges.length > 0 && (
        <div className="relative z-10">
          <div className="flex flex-wrap gap-1.5">
            {badges.map((b, i) => (
              <motion.span
                key={b.label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/70 font-medium"
              >
                {b.label}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Joined date */}
      <div className="text-xs text-white/30 relative z-10">
        📅 Member since {formatDate(user.created_at)} · {stats.ageYears} years on GitHub
      </div>
    </motion.div>
  )
}
