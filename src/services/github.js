const GITHUB_API = 'https://api.github.com'

function getHeaders() {
  const token = localStorage.getItem('gh_token')
  const headers = { Accept: 'application/vnd.github.v3+json' }
  if (token) headers['Authorization'] = `token ${token}`
  return headers
}

async function apiFetch(url) {
  const res = await fetch(url, { headers: getHeaders() })
  if (res.status === 404) throw new Error('User not found')
  if (res.status === 403) throw new Error('API rate limit exceeded. Add a GitHub token in settings.')
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
  return res.json()
}

export async function fetchUser(username) {
  return apiFetch(`${GITHUB_API}/users/${username}`)
}

export async function fetchRepos(username) {
  const repos = await apiFetch(
    `${GITHUB_API}/users/${username}/repos?sort=stars&per_page=100&type=owner`
  )
  return repos
}

export async function fetchEvents(username) {
  try {
    return await apiFetch(`${GITHUB_API}/users/${username}/events/public?per_page=30`)
  } catch {
    return []
  }
}

export function aggregateStats(user, repos, events) {
  // Total stars
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)

  // Total forks
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0)

  // Language map
  const languageMap = {}
  repos.forEach((r) => {
    if (r.language) {
      languageMap[r.language] = (languageMap[r.language] || 0) + 1
    }
  })

  // Top repo by stars
  const topRepo = repos.reduce(
    (best, r) => (r.stargazers_count > (best?.stargazers_count || 0) ? r : best),
    null
  )

  // Account age in years
  const createdAt = new Date(user.created_at)
  const ageYears = ((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365)).toFixed(1)

  // Recent activity (events in last 30 days)
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  const recentActivity = events.filter(
    (e) => new Date(e.created_at).getTime() > thirtyDaysAgo
  ).length

  // Push events (commits proxy)
  const pushEvents = events.filter((e) => e.type === 'PushEvent').length

  return {
    totalStars,
    totalForks,
    languageMap,
    topRepo,
    ageYears: parseFloat(ageYears),
    recentActivity,
    pushEvents,
    repoCount: repos.length,
  }
}

export async function fetchFullProfile(username) {
  const [user, repos, events] = await Promise.all([
    fetchUser(username),
    fetchRepos(username),
    fetchEvents(username),
  ])
  const stats = aggregateStats(user, repos, events)
  return { user, repos, events, stats }
}
