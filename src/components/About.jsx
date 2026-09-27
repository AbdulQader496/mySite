import { profile, stats, education } from '../data'
import { host } from '../term'
import Section from './Section'
import Portrait from './Portrait'

const COLORS = ['bg', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'fg']

export default function About() {
  // First + last name initials, e.g. "Gulam M. A. Qader" -> "GQ"
  const words = profile.name.split(' ')
  const initials = (words[0][0] + (words.length > 1 ? words.at(-1)[0] : '')).toUpperCase()
  const userHost = `guest@${host}`
  const rows = [
    ['Name', profile.name],
    ['Role', profile.role],
    ['Location', profile.location],
    ['Education', `${education[0].degree}, ${education[0].school.replace('Technological University Dublin', 'TU Dublin')}`],
    ...stats.map((s) => [s.label, s.value]),
    ['Shell', 'portfolio-sh 2.0'],
    ['Font', 'Lucida Console'],
  ]

  return (
    <Section id="about" cmd="neofetch">
      <div className="neofetch">
        <Portrait src={profile.photo} alt={profile.name} fallback={initials} />
        <div className="neo-info">
          <div><span className="green">guest</span>@<span className="green">{host}</span></div>
          <div className="muted">{'-'.repeat(userHost.length)}</div>
          {rows.map(([k, v]) => (
            <div key={k}><span className="green">{k}</span>: {v}</div>
          ))}
          <div className="neo-colors" aria-hidden="true">
            {COLORS.map((c) => <span key={c} style={{ background: `var(--${c})` }} />)}
          </div>
        </div>
      </div>

      <div className="about-text">
        <p className="muted"># about.txt</p>
        {profile.about.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </Section>
  )
}
