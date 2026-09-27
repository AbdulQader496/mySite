import { useMemo } from 'react'
import { profile } from '../data'
import Prompt from './Prompt'
import Terminal from './Terminal'

const at = (s) => ({ '--delay': `${s}s` })

export default function Hero() {
  const lastLogin = useMemo(
    () =>
      new Date().toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false,
      }),
    []
  )

  // Boot sequence timings (seconds). Typing speed is 45ms per character.
  return (
    <section id="top" className="hero visible">
      <p className="appear muted" style={at(0)}>Last login: {lastLogin} on ttys000</p>

      <Prompt cmd="whoami" delay={0.3} />
      <h1 className="hero-name appear" style={at(0.75)}>{profile.name}</h1>
      <p className="appear" style={at(0.85)}>
        <span className="cyan">{profile.role}</span> <span className="muted">@</span> {profile.location}
      </p>

      <Prompt cmd="cat status.txt" delay={1.2} />
      {profile.available && (
        <p className="appear status" style={at(2.0)}>
          <span className="status-dot" /> <span className="green">{profile.availability}</span>
        </p>
      )}
      <p className="appear hero-tagline" style={at(2.1)}>{profile.tagline}</p>
      <p className="appear hero-links" style={at(2.2)}>
        <a href="#projects">[ view projects ]</a>
        <a href="#contact">[ contact me ]</a>
        {profile.resume && <a href={profile.resume} target="_blank" rel="noreferrer">[ download cv ]</a>}
      </p>

      <p className="appear muted hint" style={at(2.3)}>
        Type <span className="green">help</span> to explore, or scroll down ↓
      </p>
      <div className="appear" style={at(2.4)}>
        <Terminal delay={2.4} />
      </div>
    </section>
  )
}
