import { experience } from '../data'
import { hash } from '../term'
import Section from './Section'

export default function Experience() {
  return (
    <Section id="experience" cmd="git log --career">
      {experience.map((e, i) => (
        <article key={e.role + e.company} className="commit">
          <div className="yellow">
            commit {hash(e.role + e.company)}
            {i === 0 && <> (<span className="cyan">HEAD -&gt; </span><span className="green">main</span>)</>}
          </div>
          <div><span className="muted pre">Company: </span>{e.company}</div>
          {e.location && <div><span className="muted pre">Where:   </span>{e.location}</div>}
          <div><span className="muted pre">Date:    </span>{e.period}</div>
          <h3 className="commit-msg bright">{e.role}</h3>
          <ul className="points">
            {e.points.map((pt, j) => <li key={j}>{pt}</li>)}
          </ul>
        </article>
      ))}
    </Section>
  )
}
