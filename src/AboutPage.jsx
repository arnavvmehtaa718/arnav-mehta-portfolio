import { useEffect, useRef } from 'react'
import TextReveal from './components/TextReveal.jsx'
import { links } from './data.js'
import './about-page.css'

const WORDS = ['About', 'Builder', 'Designer', 'Engineer']

/* Scroll progress through a tall section, smoothed and written to one CSS variable (--p, 0..1).
   Every animation reads that variable, so a frame costs one style write. */
function useScrollProgress(ref) {
  useEffect(() => {
    const el = ref.current
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let cur = 0
    let raf
    const tick = () => {
      const r = el.getBoundingClientRect()
      const total = r.height - innerHeight
      const target = Math.min(1, Math.max(0, -r.top / (total || 1)))
      cur = reduce ? target : cur + (target - cur) * 0.12
      if (Math.abs(target - cur) < 0.0005) cur = target
      el.style.setProperty('--p', cur.toFixed(4))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ref])
}

export default function AboutPage({ onBack }) {
  const scrolly = useRef()
  useScrollProgress(scrolly)

  useEffect(() => {
    scrollTo(0, 0)
    document.title = 'About | Arnav Mehta'
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.2 })
    document.querySelectorAll('.ab .rv').forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      document.title = 'Arnav Mehta | Developer & AI Engineer'
    }
  }, [])

  const col = (k) => (
    <div className={`ab__col ab__col--${k}`} aria-hidden="true">
      {[0, 1, 2].map((r) => WORDS.map((w, i) => <span key={`${r}${i}`} className={i % 2 ? 'o' : ''}>{w}</span>))}
    </div>
  )

  return (
    <div className="ab">
      <header className="nav nav--cs">
        <button className="back" onClick={onBack}>← Back home</button>
        <span className="mono">About</span>
        <a href={links.resume} target="_blank" rel="noreferrer" className="pill">Résumé</a>
      </header>

      <section ref={scrolly} className="ab__scrolly" aria-label="About">
        <div className="ab__sticky">
          {col('up')}
          {col('down')}
          <figure className="ab__photo">
            <img src="/arnav-hero-photo.jpg" srcSet="/arnav-hero-photo.jpg" sizes="(max-width: 899px) 100vw, 45vw" alt="Arnav Mehta" width="1100" height="1563" />
            <figcaption><span className="mono">New Delhi, India</span><b>Arnav Mehta</b></figcaption>
          </figure>
          <div className="ab__intro">
            <p className="eyebrow">About me</p>
            <h1>I build things people <span className="it">actually use.</span></h1>
            <p>
              I create intelligent full-stack applications and AI systems. From orchestrating real-time APIs and clustering algorithms to building retrieval pipelines with LLMs and knowledge graphs, I bridge robust engineering with responsive user interfaces.
            </p>
          </div>
          <span className="ab__hint mono" aria-hidden="true">Scroll ↓</span>
        </div>
      </section>

      <section className="ab__story">
        <TextReveal className="ab__big rv">
          BCA student at GGSIPU (9.1 CGPA), building end-to-end full-stack platforms, developing AI navigation engines, and competing in national hackathons including ISRO and SIH.
        </TextReveal>
        <div className="ab__cols">
          <div className="rv">
            <p className="mono">How I work</p>
            <p>I value production readiness: clean RESTful architectures, optimized algorithms, robust backend logic with FastAPI or Express, and intuitive frontends built in React and Next.js.</p>
          </div>
          <div className="rv">
            <p className="mono">What I'm into</p>
            <p>Full-stack development, AI/ML systems, dynamic knowledge graphs, data analytics with Power BI & Tableau, geospatial pipelines, and cloud deployments with Docker, Vercel and Railway.</p>
          </div>
          <div className="rv">
            <p className="mono">Right now</p>
            <p>Participant in the McKinsey Forward Program 2026, advancing Saarthi AI, and exploring ambitious software engineering and AI projects.</p>
          </div>
        </div>
        <ol className="ab__principles">
          {[['Build', 'Products with a purpose.'], ['Care', 'About how it feels.'], ['Explore', 'What the web can do.'], ['Ship', 'Then keep improving.']].map(([k, v], i) => (
            <li key={k} className="rv" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="mono">0{i + 1}</span><b>{k}</b><p>{v}</p>
            </li>
          ))}
        </ol>
        <div className="ab__cta rv">
          <a className="btn" href={`mailto:${links.email}`}>Email me</a>
          <a className="btn btn--ghost" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn btn--ghost" href={links.resume} target="_blank" rel="noreferrer">Résumé</a>
          <button className="btn btn--ghost" onClick={onBack}>See the work</button>
        </div>
      </section>
    </div>
  )
}