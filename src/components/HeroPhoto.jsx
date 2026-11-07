// Hero portrait - your photograph displayed statically.
// Background: black left side, red right side. No cursor interaction.

export default function HeroPhoto({ compact }) {
  return (
    <div className="hero__photo" aria-hidden="true">
      <img
        src="/arnav-hero-photo.jpg"
        alt="Arnav Mehta"
        className="hero__img"
      />
    </div>
  )
}