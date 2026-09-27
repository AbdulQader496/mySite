import { host } from '../term'

export function PS1({ path = '~' }) {
  return (
    <span className="ps1">
      <span className="green">guest@{host}</span>
      <span className="muted">:</span>
      <span className="blue">{path}</span>
      <span className="muted ps1-dollar">$</span>
    </span>
  )
}

// A prompt line. `cmd` is typed out when its parent becomes .visible;
// children are rendered as static (already-typed) text.
export default function Prompt({ path, cmd, delay = 0, children }) {
  return (
    <div className="prompt">
      <PS1 path={path} />
      {cmd && (
        <span className="type bright" style={{ '--n': cmd.length, '--delay': `${delay}s` }}>
          {cmd}
        </span>
      )}
      {children && <span className="bright">{children}</span>}
    </div>
  )
}
