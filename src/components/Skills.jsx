import { skills } from '../data'
import { slug } from '../term'
import Section from './Section'

export default function Skills() {
  const total = skills.reduce((n, s) => n + s.items.length, 0)
  return (
    <Section id="skills" cmd="tree ~/skills">
      <div className="tree-grid">
        {skills.map((s) => (
          <div key={s.group}>
            <div className="blue">{slug(s.group)}/</div>
            {s.items.map((item, i) => (
              <div key={item}>
                <span className="branch">{i === s.items.length - 1 ? '└── ' : '├── '}</span>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="muted tree-summary">{skills.length} directories, {total} files</p>
    </Section>
  )
}
