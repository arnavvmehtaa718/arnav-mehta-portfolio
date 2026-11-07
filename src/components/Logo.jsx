// The logo mark with the name beside it. Drawn inline so the white parts follow the text colour and the mark
// stays readable over the light About section. The mark is decorative: the visible name is the link's accessible name.
export default function Logo({ onClick }) {
  return (
    <a href="#home" className="logo" onClick={onClick}>
      <span className="logo__word">ARNAV MEHTA</span>
    </a>
  )
}
