import { useEffect, useRef, useState } from 'react'
import { profile } from '../data'
import Prompt, { PS1 } from './Prompt'

const SECTIONS = ['about', 'projects', 'skills', 'experience', 'education', 'contact']

const HELP = [
  ['about', 'who I am'],
  ['projects', 'things I have built'],
  ['skills', 'tools I work with'],
  ['experience', 'where I have worked'],
  ['education', 'degrees & certifications'],
  ['contact', 'get in touch'],
  ['whoami', 'the short version'],
  ['ls', 'list sections'],
  ['email', 'show my email'],
  ['socials', 'show my social links'],
  ['cv', 'download my CV'],
  ['clear', 'clear the terminal'],
]

function jump(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return <span className="muted">→ cd ~/{id}</span>
}

const commands = {
  help: () => (
    <div className="help">
      {HELP.map(([c, d]) => (
        <div key={c}><span className="green">{c.padEnd(12)}</span><span className="muted">{d}</span></div>
      ))}
    </div>
  ),
  ...Object.fromEntries(SECTIONS.map((s) => [s, () => jump(s)])),
  cd: ([target = '~']) => {
    const id = target.replace(/^~?\/?/, '').replace(/\/$/, '')
    if (!id) return jump('top')
    if (SECTIONS.includes(id)) return jump(id)
    return <span className="red">cd: no such directory: {target}</span>
  },
  ls: () => (
    <span>{SECTIONS.map((s) => <span key={s} className="blue">{s}/  </span>)}</span>
  ),
  whoami: () => `${profile.name} — ${profile.role}, based in ${profile.location}.`,
  email: () => <a href={`mailto:${profile.email}`}>{profile.email}</a>,
  socials: () => (
    <div>
      {profile.socials.map((s) => (
        <div key={s.label}>
          <span className="green">{s.label.toLowerCase().padEnd(10)}</span>
          <a href={s.url} target="_blank" rel="noreferrer">{s.url}</a>
        </div>
      ))}
    </div>
  ),
  cv: () => {
    if (!profile.resume) return <span className="muted">cv: no CV uploaded yet.</span>
    window.open(profile.resume, '_blank')
    return <span className="muted">opening {profile.resume} ...</span>
  },
  date: () => new Date().toString(),
  echo: (args) => args.join(' '),
  sudo: () => <span className="red">Nice try. This incident will be reported.</span>,
  exit: () => <span className="muted">There is no escape. Try scrolling down instead.</span>,
  hello: () => 'Hi there! 👋 Type help to see what you can do.',
}
commands.hi = commands.hello
commands.resume = commands.cv

export default function Terminal({ delay = 0 }) {
  const [lines, setLines] = useState([])
  const [value, setValue] = useState('')
  const [past, setPast] = useState([])
  const [pastIndex, setPastIndex] = useState(-1)
  const inputRef = useRef(null)
  const nextId = useRef(0)

  // Auto-focus on desktop once the boot sequence finishes (skip on touch to avoid popping the keyboard)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])

  const submit = (e) => {
    e.preventDefault()
    const input = value.trim()
    setValue('')
    setPastIndex(-1)
    if (input) setPast((p) => [input, ...p])

    const [name = '', ...args] = input.split(/\s+/)
    const key = name.toLowerCase()
    if (key === 'clear') return setLines([])

    let out = null
    if (key) {
      const fn = commands[key]
      out = fn ? fn(args) : (
        <span className="red">
          command not found: {name}. Type <span className="green">help</span> for a list of commands.
        </span>
      )
    }
    setLines((l) => [...l, { id: nextId.current++, cmd: input, out }])
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp' && past.length) {
      e.preventDefault()
      const i = Math.min(pastIndex + 1, past.length - 1)
      setPastIndex(i)
      setValue(past[i])
    } else if (e.key === 'ArrowDown' && pastIndex >= 0) {
      e.preventDefault()
      const i = pastIndex - 1
      setPastIndex(i)
      setValue(i >= 0 ? past[i] : '')
    }
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      {lines.map((l) => (
        <div key={l.id}>
          <Prompt>{l.cmd}</Prompt>
          {l.out && <div className="term-out">{l.out}</div>}
        </div>
      ))}
      <form className="prompt prompt-input" onSubmit={submit}>
        <PS1 />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal command. Type help for a list of commands."
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="type help"
        />
      </form>
    </div>
  )
}
