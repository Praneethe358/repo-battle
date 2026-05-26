// Weighted scoring system for battle winner calculation

const WEIGHTS = {
  followers: 1.5,
  totalStars: 2.0,
  repoCount: 0.5,
  recentActivity: 1.0,
  ageYears: 0.3,
  totalForks: 0.8,
  pushEvents: 0.6,
}

function normalize(val, max) {
  if (!max || max === 0) return 0
  return Math.min(val / max, 1) * 100
}

export function calculateScores(p1, p2) {
  const metrics = [
    'followers', 'totalStars', 'repoCount', 'recentActivity',
    'ageYears', 'totalForks', 'pushEvents',
  ]

  const vals1 = {
    followers: p1.user.followers,
    totalStars: p1.stats.totalStars,
    repoCount: p1.stats.repoCount,
    recentActivity: p1.stats.recentActivity,
    ageYears: p1.stats.ageYears,
    totalForks: p1.stats.totalForks,
    pushEvents: p1.stats.pushEvents,
  }

  const vals2 = {
    followers: p2.user.followers,
    totalStars: p2.stats.totalStars,
    repoCount: p2.stats.repoCount,
    recentActivity: p2.stats.recentActivity,
    ageYears: p2.stats.ageYears,
    totalForks: p2.stats.totalForks,
    pushEvents: p2.stats.pushEvents,
  }

  let score1 = 0
  let score2 = 0

  metrics.forEach((m) => {
    const max = Math.max(vals1[m] || 0, vals2[m] || 0)
    const n1 = normalize(vals1[m] || 0, max)
    const n2 = normalize(vals2[m] || 0, max)
    score1 += n1 * WEIGHTS[m]
    score2 += n2 * WEIGHTS[m]
  })

  const total = score1 + score2 || 1
  return {
    score1: Math.round(score1),
    score2: Math.round(score2),
    pct1: Math.round((score1 / total) * 100),
    pct2: Math.round((score2 / total) * 100),
    winner: score1 >= score2 ? 'p1' : 'p2',
    diff: Math.abs(score1 - score2),
  }
}

export function getStatComparisons(p1, p2) {
  return [
    {
      label: 'Followers',
      icon: '👥',
      val1: p1.user.followers,
      val2: p2.user.followers,
      format: (v) => v.toLocaleString(),
    },
    {
      label: 'Public Repos',
      icon: '📦',
      val1: p1.user.public_repos,
      val2: p2.user.public_repos,
      format: (v) => v.toLocaleString(),
    },
    {
      label: 'Total Stars',
      icon: '⭐',
      val1: p1.stats.totalStars,
      val2: p2.stats.totalStars,
      format: (v) => v.toLocaleString(),
    },
    {
      label: 'Total Forks',
      icon: '🍴',
      val1: p1.stats.totalForks,
      val2: p2.stats.totalForks,
      format: (v) => v.toLocaleString(),
    },
    {
      label: 'Recent Activity',
      icon: '⚡',
      val1: p1.stats.recentActivity,
      val2: p2.stats.recentActivity,
      format: (v) => `${v} events`,
    },
    {
      label: 'Account Age',
      icon: '📅',
      val1: p1.stats.ageYears,
      val2: p2.stats.ageYears,
      format: (v) => `${v} yrs`,
    },
    {
      label: 'Following',
      icon: '🔗',
      val1: p1.user.following,
      val2: p2.user.following,
      format: (v) => v.toLocaleString(),
    },
  ]
}
