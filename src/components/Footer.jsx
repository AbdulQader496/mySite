import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="footer muted">
      <p>[process completed]</p>
      <p>© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  )
}
