// Template-based AI-style battle commentary generator

function topLang(languageMap) {
  const entries = Object.entries(languageMap || {}).sort((a, b) => b[1] - a[1])
  return entries[0]?.[0] || 'various languages'
}

function diversityScore(languageMap) {
  return Object.keys(languageMap || {}).length
}

export function generateCommentary(p1, p2, winner) {
  const name1 = p1.user.login
  const name2 = p2.user.login
  const winnerName = winner === 'p1' ? name1 : name2
  const loserName = winner === 'p1' ? name2 : name1

  const wStats = winner === 'p1' ? p1 : p2
  const lStats = winner === 'p1' ? p2 : p1

  const wLang = topLang(wStats.stats.languageMap)
  const lLang = topLang(lStats.stats.languageMap)
  const wDiversity = diversityScore(wStats.stats.languageMap)
  const lDiversity = diversityScore(lStats.stats.languageMap)
  const wStars = wStats.stats.totalStars
  const lStars = lStats.stats.totalStars
  const wActivity = wStats.stats.recentActivity
  const lActivity = lStats.stats.recentActivity
  const wFollowers = wStats.user.followers
  const lFollowers = lStats.user.followers
  const wAge = wStats.stats.ageYears
  const lAge = lStats.stats.ageYears

  const lines = []

  // Opening dominant statement
  if (wStars > lStars * 2) {
    lines.push(`⚔️ **${winnerName}** dominates the battlefield with ${wStars.toLocaleString()} total stars — nearly double ${loserName}'s ${lStars.toLocaleString()}.`)
  } else if (wStars > lStars) {
    lines.push(`⚔️ **${winnerName}** edges ahead in starred repositories (${wStars.toLocaleString()} vs ${lStars.toLocaleString()}), signaling stronger community recognition.`)
  } else {
    lines.push(`⚔️ **${winnerName}** clinches the battle on overall weighted performance, despite a close competition.`)
  }

  // Language insight
  if (wLang === lLang) {
    lines.push(`🔥 Both warriors share a love for **${wLang}**, but ${winnerName} pushes further with ${wDiversity} languages vs ${loserName}'s ${lDiversity}.`)
  } else {
    lines.push(`🧠 ${winnerName} is a **${wLang}** specialist with ${wDiversity} languages in the arsenal, while ${loserName} champions **${lLang}** (${lDiversity} languages).`)
  }

  // Activity comparison
  if (wActivity > lActivity + 5) {
    lines.push(`⚡ ${winnerName} has been grinding hard — **${wActivity} events** in the last 30 days vs ${loserName}'s ${lActivity}, showing relentless momentum.`)
  } else if (lActivity > wActivity) {
    lines.push(`⚡ ${loserName} fights back with higher recent activity (${lActivity} events), but it wasn't enough to overcome ${winnerName}'s overall dominance.`)
  } else {
    lines.push(`⚡ Both developers maintain similar activity levels, making this a battle of quality over quantity.`)
  }

  // Follower influence
  if (wFollowers > 1000) {
    lines.push(`👥 With **${wFollowers.toLocaleString()} followers**, ${winnerName} commands serious influence in the developer community.`)
  } else if (wFollowers > lFollowers) {
    lines.push(`👥 ${winnerName}'s following of ${wFollowers.toLocaleString()} edges out ${loserName}'s ${lFollowers.toLocaleString()}, indicating stronger community ties.`)
  }

  // Experience angle
  if (wAge > lAge + 2) {
    lines.push(`📅 Veteran status: ${winnerName} has ${wAge} years on GitHub to ${loserName}'s ${lAge}, bringing seasoned experience to the arena.`)
  } else if (lAge > wAge + 2) {
    lines.push(`📅 Despite being the newer challenger with ${wAge} years on GitHub, ${winnerName} outperforms the more experienced ${loserName} (${lAge} years).`)
  }

  // Final verdict
  lines.push(`🏆 **Verdict**: ${winnerName} claims the GitHub throne with superior metrics across stars, influence, and coding breadth. ${loserName} — respectable fight, but the crown goes to the champion today.`)

  return lines
}

export function getBadges(profile) {
  const badges = []
  const { user, stats } = profile

  if (stats.totalStars >= 1000) badges.push({ label: '⭐ Star Collector', color: 'amber' })
  if (user.followers >= 500) badges.push({ label: '👥 Influencer', color: 'purple' })
  if (stats.repoCount >= 50) badges.push({ label: '📦 Prolific Builder', color: 'cyan' })
  if (stats.recentActivity >= 20) badges.push({ label: '⚡ Hyperactive', color: 'green' })
  if (Object.keys(stats.languageMap).length >= 5) badges.push({ label: '🌐 Polyglot', color: 'pink' })
  if (stats.ageYears >= 5) badges.push({ label: '🎖️ Veteran', color: 'gray' })
  if (stats.topRepo?.stargazers_count >= 100) badges.push({ label: '🚀 Viral Repo', color: 'purple' })

  return badges
}
