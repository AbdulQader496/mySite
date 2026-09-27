import { useEffect, useState } from 'react'
import { profile } from '../data'
import { host, useLocalTime } from '../term'

// tmux-style status bar: doubles as the site navigation.
const windows = [
  { id: 'top', label: '~' },
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'education', label: 'education' },
  { id: 'contact', label: 'contact' },
]

export default function StatusBar() {
  const [active, setActive] = useState('top')
  const [progress, setProgress] = useState(0)
  const time = useLocalTime(profile.timezone)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.round((window.scrollY / max) * 100) : 0)
      let current = 'top'
      for (const { id } of windows) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <nav className="statusbar" aria-label="Sections">
      <a href="#top" className="sb-session">[{host}]</a>
      <div className="sb-windows">
        {windows.map((w, i) => (
          <a key={w.id} href={`#${w.id}`} className={active === w.id ? 'active' : ''}>
            {i}:{w.label}{active === w.id ? '*' : ''}
          </a>
        ))}
      </div>
      <div className="sb-right">{progress}% · {time}</div>
    </nav>
  )
}
