import Prompt from './Prompt'

export default function Section({ id, cmd, children }) {
  return (
    <section id={id} className="section reveal" style={{ '--n': cmd.length }}>
      <Prompt cmd={cmd} />
      <div className="output">{children}</div>
    </section>
  )
}
