import { education, certifications } from '../data'
import Prompt from './Prompt'
import Section from './Section'

export default function Education() {
  return (
    <Section id="education" cmd="cat education.txt">
      {education.map((e) => (
        <div key={e.degree + e.school} className="edu">
          <div className="muted">[{e.period}]</div>
          <h3 className="bright">{e.degree}</h3>
          <div>
            <span className="cyan">{e.school}</span>
            {e.location && <span className="muted"> · {e.location}</span>}
          </div>
          {e.grade && <div><span className="muted">Result: </span><span className="yellow">{e.grade}</span></div>}
          {e.details && <p className="muted">{e.details}</p>}
        </div>
      ))}

      {certifications.length > 0 && (
        <>
          <Prompt>ls ~/certifications</Prompt>
          <ul className="certs">
            {certifications.map((c) => (
              <li key={c.name}>
                <span className="green">✓</span>
                <span>
                  {c.url ? <a href={c.url} target="_blank" rel="noreferrer">{c.name}</a> : <span className="bright">{c.name}</span>}
                  <span className="muted">{c.issuer && ` — ${c.issuer}`} ({c.year})</span>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  )
}
