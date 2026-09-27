import { host } from '../term'

export default function TitleBar() {
  return (
    <header className="titlebar">
      <div className="dots" aria-hidden="true"><span /><span /><span /></div>
      <div className="title">guest@{host}: ~/portfolio</div>
    </header>
  )
}
