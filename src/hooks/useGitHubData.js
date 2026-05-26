import { useState, useCallback } from 'react'
import { fetchFullProfile } from '../services/github'

export function useGitHubData() {
  const [state, setState] = useState({
    profile1: null,
    profile2: null,
    loading: false,
    error: null,
  })

  const fetchBattle = useCallback(async (user1, user2) => {
    setState({ profile1: null, profile2: null, loading: true, error: null })
    try {
      const [p1, p2] = await Promise.all([
        fetchFullProfile(user1),
        fetchFullProfile(user2),
      ])
      setState({ profile1: p1, profile2: p2, loading: false, error: null })
      return true
    } catch (err) {
      setState({ profile1: null, profile2: null, loading: false, error: err.message })
      return false
    }
  }, [])

  return { ...state, fetchBattle }
}
