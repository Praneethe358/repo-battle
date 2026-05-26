import { motion } from 'framer-motion'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { fadeInUp, staggerContainer } from '../animations/variants'
import { getLanguageColor, getTopLanguages, formatNumber } from '../utils/formatters'

const PURPLE = '#7C3AED'
const CYAN = '#06B6D4'

function SectionTitle({ children }) {
  return (
    <motion.h3
      variants={fadeInUp}
      className="text-lg font-bold text-white/80 mb-5 flex items-center gap-2"
    >
      {children}
    </motion.h3>
  )
}

function ChartCard({ children, className = '' }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`glass-card p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function ChartsSection({ profile1, profile2 }) {
  const u1 = profile1.user.login
  const u2 = profile2.user.login
  const s1 = profile1.stats
  const s2 = profile2.stats

  // --- Radar data ---
  const maxFollowers = Math.max(profile1.user.followers, profile2.user.followers) || 1
  const maxStars = Math.max(s1.totalStars, s2.totalStars) || 1
  const maxRepos = Math.max(s1.repoCount, s2.repoCount) || 1
  const maxActivity = Math.max(s1.recentActivity, s2.recentActivity) || 1
  const maxAge = Math.max(s1.ageYears, s2.ageYears) || 1
  const maxForks = Math.max(s1.totalForks, s2.totalForks) || 1

  const radarData = [
    {
      subject: 'Followers',
      [u1]: Math.round((profile1.user.followers / maxFollowers) * 100),
      [u2]: Math.round((profile2.user.followers / maxFollowers) * 100),
    },
    {
      subject: 'Stars',
      [u1]: Math.round((s1.totalStars / maxStars) * 100),
      [u2]: Math.round((s2.totalStars / maxStars) * 100),
    },
    {
      subject: 'Repos',
      [u1]: Math.round((s1.repoCount / maxRepos) * 100),
      [u2]: Math.round((s2.repoCount / maxRepos) * 100),
    },
    {
      subject: 'Activity',
      [u1]: Math.round((s1.recentActivity / maxActivity) * 100),
      [u2]: Math.round((s2.recentActivity / maxActivity) * 100),
    },
    {
      subject: 'Experience',
      [u1]: Math.round((s1.ageYears / maxAge) * 100),
      [u2]: Math.round((s2.ageYears / maxAge) * 100),
    },
    {
      subject: 'Forks',
      [u1]: Math.round((s1.totalForks / maxForks) * 100),
      [u2]: Math.round((s2.totalForks / maxForks) * 100),
    },
  ]

  // --- Language pie data ---
  const buildLangPie = (langMap) => {
    const tops = getTopLanguages(langMap, 6)
    const total = tops.reduce((s, l) => s + l.count, 0)
    return tops.map((l) => ({
      name: l.lang,
      value: Math.round((l.count / total) * 100),
      color: getLanguageColor(l.lang),
    }))
  }
  const langs1 = buildLangPie(s1.languageMap)
  const langs2 = buildLangPie(s2.languageMap)

  // --- Bar chart top repos ---
  const topRepos1 = profile1.repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
  const topRepos2 = profile2.repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)

  const barData = Array.from({ length: Math.max(topRepos1.length, topRepos2.length) }, (_, i) => ({
    name: `#${i + 1}`,
    [u1]: topRepos1[i]?.stargazers_count || 0,
    [u2]: topRepos2[i]?.stargazers_count || 0,
    repo1: topRepos1[i]?.name || '',
    repo2: topRepos2[i]?.name || '',
  }))

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="glass-card p-3 text-xs border border-white/10">
        <div className="font-bold text-white mb-1.5">{label}</div>
        {payload.map((p) => (
          <div key={p.name} style={{ color: p.fill }} className="flex items-center gap-2">
            <span>{p.name}:</span>
            <span className="font-bold">{formatNumber(p.value)} ⭐</span>
          </div>
        ))}
      </div>
    )
  }

  const CustomPieTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="glass-card p-3 text-xs border border-white/10">
        <div style={{ color: payload[0].payload.color }} className="font-bold">
          {payload[0].name}
        </div>
        <div className="text-white">{payload[0].value}% of repos</div>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="w-full max-w-6xl mx-auto space-y-8"
    >
      <motion.div variants={fadeInUp} className="text-center mb-2">
        <h2 className="text-2xl font-bold gradient-text">📊 Analytics Dashboard</h2>
        <p className="text-white/40 text-sm mt-1">Deep-dive comparison across all metrics</p>
      </motion.div>

      {/* Radar Chart */}
      <ChartCard>
        <SectionTitle>🎯 Developer Strengths Radar</SectionTitle>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            />
            <Radar
              name={u1}
              dataKey={u1}
              stroke={PURPLE}
              fill={PURPLE}
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Radar
              name={u2}
              dataKey={u2}
              stroke={CYAN}
              fill={CYAN}
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Legend
              wrapperStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                background: '#0a0a1a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.75rem',
                color: 'white',
                fontSize: '12px',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Top Repos Bar Chart */}
      <ChartCard>
        <SectionTitle>⭐ Top 5 Repositories by Stars</SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={barData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
            <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }} />
            <Bar dataKey={u1} fill={PURPLE} radius={[6, 6, 0, 0]} />
            <Bar dataKey={u2} fill={CYAN} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Language Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: u1, data: langs1, color: PURPLE },
          { name: u2, data: langs2, color: CYAN },
        ].map(({ name, data, color }) => (
          <ChartCard key={name}>
            <SectionTitle>
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: color, boxShadow: `0 0 8px ${color}` }}
              />
              {name} — Languages
            </SectionTitle>
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {data.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-white/30 text-sm">
                No language data available
              </div>
            )}
          </ChartCard>
        ))}
      </div>
    </motion.div>
  )
}
