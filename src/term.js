import { useEffect, useState } from 'react'
import { profile } from './data'

// Hostname shown in the prompt: guest@<host>
export const host = (profile.handle || profile.name.split(' ')[0]).toLowerCase()

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Stable fake commit hash for the git-log style experience section
export const hash = (s) => {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h.toString(16).padStart(8, '0').slice(0, 7)
}

export function useLocalTime(timeZone) {
  const format = () =>
    new Date().toLocaleTimeString('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' })
  const [time, setTime] = useState(format)
  useEffect(() => {
    const t = setInterval(() => setTime(format()), 30000)
    return () => clearInterval(t)
  }, [timeZone])
  return time
}
