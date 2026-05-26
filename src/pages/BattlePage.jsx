import { useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaShare, FaCamera, FaRedo } from 'react-icons/fa'
import { GiSwords } from 'react-icons/gi'
import toast from 'react-hot-toast'
import ParticleBackground from '../components/ParticleBackground'
import BattleCard from '../components/BattleCard'
import VSBanner from '../components/VSBanner'
import StatComparison from '../components/StatComparison'
import WinnerBanner from '../components/WinnerBanner'
import ChartsSection from '../components/ChartsSection'
import LoadingScreen from '../components/LoadingScreen'
import ErrorCard from '../components/ErrorCard'
import { useGitHubData } from '../hooks/useGitHubData'
import { calculateScores, getStatComparisons } from '../utils/scoring'
import { fadeInUp } from '../animations/variants'

export default function BattlePage() {
  const { user1, user2 } = useParams()
  const navigate = useNavigate()
  const { profile1, profile2, loading, error, fetchBattle } = useGitHubData()

  const runBattle = useCallback(() => {
    if (user1 && user2) fetchBattle(user1, user2)
  }, [user1, user2, fetchBattle])

  useEffect(() => {
    runBattle()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [runBattle])

  const handleShare = () => {
    const url = window.location.href
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
      toast.success('Battle URL copied to clipboard! 🔗')
    } else {
      toast.error('Could not copy URL.')
    }
  }

  const handleScreenshot = async () => {
    try {
      const { default: html2canvas } = await import('html2canvas')
      const el = document.getElementById('battle-content')
      if (!el) return
      toast.loading('Capturing screenshot...')
      const canvas = await html2canvas(el, {
        backgroundColor: '#050510',
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
      })
      toast.dismiss()
      const link = document.createElement('a')
      link.download = `github-battle-${user1}-vs-${user2}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      toast.success('Screenshot saved!')
    } catch {
      toast.dismiss()
      toast.error('Screenshot failed. Try again.')
    }
  }

  const scores = profile1 && profile2 ? calculateScores(profile1, profile2) : null
  const comparisons = profile1 && profile2 ? getStatComparisons(profile1, profile2) : []

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 text-sm group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
            New Battle
          </Link>

          <div className="flex items-center gap-2">
            <GiSwords className="text-amber-400 text-xl" />
            <span className="font-mono text-white/60 text-sm">
              <span className="text-purple-400 font-bold">{user1}</span>
              <span className="text-white/30 mx-2">vs</span>
              <span className="text-cyan-400 font-bold">{user2}</span>
            </span>
          </div>

          {profile1 && profile2 && (
            <div className="flex items-center gap-2">
              <motion.button
                id="share-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-2 glass-card border border-white/10 rounded-xl text-white/60 hover:text-white text-sm transition-all duration-200"
              >
                <FaShare className="text-xs" /> Share
              </motion.button>
              <motion.button
                id="screenshot-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleScreenshot}
                className="flex items-center gap-1.5 px-3 py-2 glass-card border border-white/10 rounded-xl text-white/60 hover:text-white text-sm transition-all duration-200"
              >
                <FaCamera className="text-xs" /> Save
              </motion.button>
            </div>
          )}
        </div>

        {/* Loading state */}
        {loading && <LoadingScreen />}

        {/* Error state */}
        {error && !loading && (
          <div className="py-20">
            <ErrorCard message={error} onRetry={runBattle} />
          </div>
        )}

        {/* Battle content */}
        {profile1 && profile2 && scores && !loading && (
          <div id="battle-content" className="space-y-16">
            {/* Battle cards + VS */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-start">
              <BattleCard
                profile={profile1}
                side="left"
                isWinner={scores.winner === 'p1'}
              />
              <VSBanner
                name1={profile1.user.login}
                name2={profile2.user.login}
              />
              <BattleCard
                profile={profile2}
                side="right"
                isWinner={scores.winner === 'p2'}
              />
            </div>

            {/* Winner banner */}
            <WinnerBanner
              profile1={profile1}
              profile2={profile2}
              scores={scores}
              winner={scores.winner}
            />

            {/* Stat comparison rows */}
            <StatComparison comparisons={comparisons} />

            {/* Charts */}
            <ChartsSection profile1={profile1} profile2={profile2} />

            {/* Footer CTA */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center py-10"
            >
              <p className="text-white/40 text-sm mb-4">Want to run another battle?</p>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary flex items-center gap-2 mx-auto"
                >
                  <span className="flex items-center gap-2">
                    <FaRedo /> New Battle
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
