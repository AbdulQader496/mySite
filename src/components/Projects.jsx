import { projects } from '../data'
import { slug } from '../term'
import Section from './Section'

export default function Projects() {
  return (
    <Section id="projects" cmd="ls -l ~/projects">
      <p className="muted">total {projects.length}</p>
      <ul className="ls">
        {projects.map((p) => (
          <li key={p.title} className="ls-item">
            <div className="ls-head">
              <span className="muted">drwxr-xr-x</span>
              <span className="yellow">{p.year}</span>
              <span className="blue">{slug(p.title)}/</span>
            </div>
            <div className="ls-body">
              <h3 className="bright">{p.title}</h3>
              <p>{p.description}</p>
              <p>
                <span className="muted">stack: </span>
                {p.tech.map((t) => <span key={t} className="tag">[{t}]</span>)}
              </p>
              {(p.link || p.repo) && (
                <p className="ls-links">
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer">→ live</a>}
                  {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">→ source</a>}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
