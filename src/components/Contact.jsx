import { useState } from 'react'
import { profile } from '../data'
import Section from './Section'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [copied, setCopied] = useState(false)
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  // No backend: opens the visitor's email app with the message pre-filled.
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <Section id="contact" cmd="./contact.sh">
      <p className="green">Starting contact.sh ... done.</p>
      <p className="contact-intro">
        I&apos;m open to new opportunities and collaborations. Drop me a message and I&apos;ll get back to you.
      </p>

      <div className="kv">
        <span className="key">email</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <button type="button" className="term-btn" onClick={copyEmail}>
          {copied ? '[copied ✓]' : '[copy]'}
        </button>
      </div>
      {profile.socials.map((s) => (
        <div key={s.label} className="kv">
          <span className="key">{s.label.toLowerCase()}</span>
          <a href={s.url} target="_blank" rel="noreferrer">{s.url.replace(/^https?:\/\//, '')}</a>
        </div>
      ))}

      <form className="term-form" onSubmit={submit}>
        <p className="muted"># or send a message directly:</p>
        <label>
          <span className="cyan">? name:</span>
          <input name="name" value={form.name} onChange={update} required autoComplete="name" />
        </label>
        <label>
          <span className="cyan">? email:</span>
          <input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" />
        </label>
        <label className="col">
          <span className="cyan">? message:</span>
          <textarea name="message" rows="5" value={form.message} onChange={update} required />
        </label>
        <button type="submit" className="term-btn send">[ send ↵ ]</button>
      </form>
    </Section>
  )
}
