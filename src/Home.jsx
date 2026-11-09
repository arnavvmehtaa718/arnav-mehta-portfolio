import { lazy, startTransition, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import InfiniteSpiral from './components/InfiniteSpiral.jsx'
import TextReveal from './components/TextReveal.jsx'
import Connect from './components/Connect.jsx'
import ScrollStack, { ScrollStackItem } from './components/ScrollStack.jsx'
import TextType from './components/TextType.jsx'
import GlitchText from './components/GlitchText.jsx'
import SplitFlapText from './components/SplitFlapText.jsx'
import TechText from './components/TechText.jsx'
import { Reel, VideoModal } from './components/Reel.jsx'
import { makeCovers } from './parts.jsx'
import { small } from './img.js'
import HeroPhoto from './components/HeroPhoto.jsx'
import GooeyNav from './components/GooeyNav.jsx'
import { StaggeredMenu } from './components/StaggeredMenu.jsx'
import LogoLoop from './components/LogoLoop.jsx'
import OptionWheel from './components/OptionWheel.jsx'
import LiveBoard from './components/LiveBoard.jsx'
import Logo from './components/Logo.jsx'
import SquaresFx from './components/SquaresFx.jsx'
import { achievements, archive, journey, links, liveWork, projects, proof, repos, skillLogos, skills } from './data.js'

// Heavy, below-the-fold or desktop-only pieces load in their own chunks so the first paint ships less JS.
const DecryptedText = lazy(() => import('./components/DecryptedText.jsx'))
const StrokeText = lazy(() => import('./components/StrokeText.jsx'))
const CircularText = lazy(() => import('./components/CircularText.jsx'))
const TrueFocus = lazy(() => import('./components/TrueFocus.jsx'))
const FlowingMenu = lazy(() => import('./components/FlowingMenu.jsx'))
const Cubes = lazy(() => import('./components/Cubes.jsx'))
const Strands = lazy(() => import('./components/Strands.jsx'))
const Stack = lazy(() => import('./components/Stack.jsx'))
const ImageTrail = lazy(() => import('./components/ImageTrail.jsx'))

const STAGES = 6

const NAV = [
  ['home', 'Home'],
  ['work', 'Work'],
  ['about', 'About'],
  ['journey', 'Journey'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
]

/* Vertical scroll drives a pinned horizontal track (desktop / landscape).
   Below the breakpoint the same panels simply stack vertically. */
function useHorizontal(wrapRef, trackRef, barRef, onActive, fx) {
  const s = useRef({ cur: 0, target: 0, max: 0, enabled: false })
  const panelsRef = useRef([])
  const parsRef = useRef([])
  let pars = []
  let panels = []

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    const st = s.current
    const mq = matchMedia('(min-width: 900px) and (min-aspect-ratio: 1/1)')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let lastActive = ''

    // Square sweep: progress of the boundary crossing the screen (0 = not yet, 1 = gone)
    const strength = (u) => u

    const measure = () => {
      st.enabled = mq.matches
      panelsRef.current = [...track.children].map((el) => ({ el, id: el.id, nav: el.dataset.nav || el.id, left: el.offsetLeft, w: el.offsetWidth, d: 0 }))
      panels = panelsRef.current
      if (!st.enabled) {
        docMax = document.documentElement.scrollHeight - innerHeight
        kick()
        wrap.style.height = ''
        track.style.transform = ''
        pars.forEach((p) => (p.el.style.transform = ''))
        pars = []
        return
      }
      st.max = Math.max(0, track.scrollWidth - innerWidth)
      wrap.style.height = `${st.max + innerHeight}px`
      pars = [...track.querySelectorAll('[data-speed]')].map((el) => ({
        el,
        speed: +el.dataset.speed,
        left: el.closest('.panel').offsetLeft,
      }))
      kick()
    }

    // Frames only run while the track is catching up to the scroll position; a scroll event restarts them.
    let raf = 0
    let docMax = 0
    const tick = () => {
      raf = 0
      if (st.enabled) {
        st.target = Math.min(st.max, Math.max(0, scrollY - wrap.offsetTop))
        st.cur = reduce ? st.target : st.cur + (st.target - st.cur) * 0.1
        if (Math.abs(st.target - st.cur) < 0.05) st.cur = st.target
        track.style.transform = `translate3d(${-st.cur}px,0,0)`
        for (const p of pars) p.el.style.transform = `translate3d(${(st.cur - p.left) * p.speed}px,0,0)`
        barRef.current.style.transform = `scaleX(${st.max ? st.cur / st.max : 0})`
        if (!reduce) {
          let sq = 0
          for (let i = 1; i < panels.length; i++) {
            const b = panels[i].left - st.cur
            if (b > 0 && b < innerWidth) sq = Math.max(sq, strength(1 - b / innerWidth))
          }
          fx.current?.set(sq)
        }
        markLight(panels.some((p) => p.el.classList.contains('about') && p.left - st.cur <= 150 && p.left - st.cur + p.w > 150))
        const pos = st.cur + innerWidth * 0.5
        const a = panels.find((p) => pos >= p.left && pos < p.left + p.w)
        if (a && a.nav !== lastActive) onActive((lastActive = a.nav))
      } else {
        barRef.current.style.transform = `scaleX(${docMax ? scrollY / docMax : 0})`
        markLight(panels.some((p) => { if (!p.el.classList.contains('about')) return false; const r = p.el.getBoundingClientRect(); return r.top <= 40 && r.bottom > 40 }))
        // phones scroll normally: no square transition in the stacked layout
        fx.current?.set(0)
        return
      }
      if (st.cur !== st.target) raf = requestAnimationFrame(tick)
    }
    // the About section is light: tell the header / mobile menu so the logo can switch to dark ink over it
    let light = null
    const markLight = (on) => {
      if (on === light) return
      light = on
      document.querySelector('.nav')?.classList.toggle('on-light', on)
      document.querySelector('.sm-wrap')?.classList.toggle('on-light', on)
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    // trackpad sideways swipes + arrow keys also move the page
    const onWheel = (e) => {
      if (!st.enabled || e.target.closest('.flex-carousel')) return
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) scrollBy(0, e.deltaX)
    }
    const onKey = (e) => {
      if (!st.enabled || e.target.closest('input, textarea, select')) return
      if (e.key === 'ArrowRight') scrollBy(0, innerWidth * 0.6)
      if (e.key === 'ArrowLeft') scrollBy(0, -innerWidth * 0.6)
    }

    measure()
    addEventListener('scroll', kick, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    addEventListener('resize', measure)
    addEventListener('wheel', onWheel, { passive: true })
    addEventListener('keydown', onKey)
    mq.addEventListener('change', measure)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('scroll', kick)
      ro.disconnect()
      removeEventListener('resize', measure)
      removeEventListener('wheel', onWheel)
      removeEventListener('keydown', onKey)
      removeEventListener('change', measure)
    }
  }, [wrapRef, trackRef, barRef, onActive])

  const goTo = (id) => {
    // Use ref to ensure we always have access to current panels
    let currentPanels = panelsRef.current
    
    // If panels aren't measured yet, measure them first
    if (!currentPanels.length && trackRef.current) {
      currentPanels = [...trackRef.current.children].map((el) => ({ 
        el, 
        id: el.id, 
        nav: el.dataset.nav || el.id, 
        left: el.offsetLeft, 
        w: el.offsetWidth, 
        d: 0 
      }))
      panelsRef.current = currentPanels
    }
    
    if (!currentPanels.length) return
    
    const panel = currentPanels.find((p) => p.nav === id || p.el.id === id)
    if (!panel) return
    
    const st = s.current
    st.cur = panel.left
    st.target = panel.left
    const track = trackRef.current
    const wrap = wrapRef.current
    window.scrollTo(0, panel.left + (wrap?.offsetTop || 0))
    track.style.transform = `translate3d(${-st.cur}px,0,0)`
  }
  return goTo
}

function useViewport() {
  const [w, setW] = useState(innerWidth)
  useEffect(() => {
    const on = () => setW(innerWidth)
    addEventListener('resize', on)
    return () => removeEventListener('resize', on)
  }, [])
  return w
}

// Same query useHorizontal uses: true while panels run sideways.
const H_QUERY = '(min-width: 900px) and (min-aspect-ratio: 1/1)'
function useHorizontalMode() {
  const [on, setOn] = useState(() => matchMedia(H_QUERY).matches)
  useEffect(() => {
    const mq = matchMedia(H_QUERY)
    const f = () => setOn(mq.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  return on
}

// Mounts its children the first time the slot nears the screen, then keeps them.
function Later({ className, children, ...rest }) {
  const ref = useRef()
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { rootMargin: '300px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={className} {...rest}>{on && children}</div>
}

// Mounts its children only while the slot is on screen, so offscreen canvases and rAF loops cost nothing.
function InView({ className, children }) {
  const ref = useRef()
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting))
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={className} aria-hidden="true">{on && <Suspense fallback={null}>{children}</Suspense>}</div>
}

const allSkills = [...new Set(skills.flatMap((g) => g.items))].map((t) => ({ node: <span className="skillbar__item">{t}</span>, title: t }))

function Milestone({ m, i }) {
  return (
    <div className={`jcard ${i === journey.length - 1 ? 'jcard--now' : ''}`}>
      {/* Background watermark/emblem */}
      {m.logo && (
        <div className="jcard__watermark" aria-hidden="true">
          <img src={m.logo} alt="" className="jcard__watermark-img" loading="lazy" decoding="async" draggable="false" />
        </div>
      )}
      <div className="jcard__top">
        <span className="jcard__n">{String(i + 1).padStart(2, '0')}</span>
        {m.logo && (
          <div className="jcard__badge">
            <img src={m.logo} alt="" width="26" height="26" loading="lazy" decoding="async" className="jcard__logo" />
            {m.org && <span className="jcard__org">{m.org}</span>}
          </div>
        )}
      </div>
      <div className="jcard__body">
        <span className="jcard__tag mono">{m.tag}</span>
        <h3>{m.t}</h3>
        <p>{m.d}</p>
      </div>
    </div>
  )
}
// Stack draws the last card on top, so feed it newest-first to show milestone 01 first.
const stackCards = journey.map((m, i) => <Milestone key={m.t} m={m} i={i} />).reverse()

function Tech({ text, size }) {
  return (
    <Later className="techtext" style={{ height: size * 1.15 }}>
      <TechText
        text={text}
        fontFamily="Inter Tight"
        fontWeight={700}
        fontSize={size}
        color="#f2f2f0"
        accentColor="#c6ff3d"
        labels
        specks={12}
      />
    </Later>
  )
}

// explicit width/height: LogoLoop measures the row before images load, and a 0-wide row makes it clone endlessly
const logos = skillLogos.map(([slug, label]) => ({
  src: `/tech-icons/${slug}.svg`,
  alt: label,
  title: label,
  width: 40,
  height: 40,
}))
const logoRows = [logos.slice(0, 10), logos.slice(10)]

// One row per project or live site for the flowing index. Case studies open in place; the rest go to the live site.
const indexItems = [
  ...projects.map((p) => ({ text: p.title, link: `#/work/${p.slug}`, image: p.gallery?.[0] || p.shot })),
  ...liveWork.filter((w) => !w.slug).map((w) => ({ text: w.t, link: w.url, image: w.shot })),
]
// Featured work panels: sharp real screenshots where they exist; the drawn cover only for the rest.
const realImage = (p) => p.shot || p.gallery?.[0]
const trailImages = [...new Set(projects.flatMap((p) => p.gallery || []).concat(liveWork.flatMap((w) => w.gallery || [])))]
const fine = typeof matchMedia !== 'undefined' && matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches

// Only this small component re-renders when the section changes; Home pushes the id in through `bind`.
function NavGooey({ bind, onGo }) {
  const [active, setActiveId] = useState('home')
  useEffect(() => bind(setActiveId), [bind])
  return (
    <GooeyNav
      items={NAV.map(([id, label]) => ({ label, href: `#${id}` }))}
      activeIndex={NAV.findIndex(([id]) => id === active)}
      onSelect={(k, e) => onGo(NAV[k][0])(e)}
      particleCount={12}
      particleDistances={[70, 8]}
      particleR={80}
      animationTime={550}
    />
  )
}

const Ext = ({ href, children, className = '' }) => (
  <a href={href} target="_blank" rel="noreferrer" className={className}>{children}</a>
)

export default function Home({ onOpen, returnTo, setLastSection }) {
  const wrapRef = useRef()
  const trackRef = useRef()
  const barRef = useRef()
  const navRef = useRef()
  const fxRef = useRef()
  // Highlight the current section by toggling a class directly: a React state update here would
  // re-render the whole page (carousel, reels, 3D) every time a panel boundary is crossed.
  const gooeySet = useRef(null)
  const bindGooey = useCallback((fn) => { gooeySet.current = fn }, [])
  const setActive = useCallback((id) => {
    navRef.current?.querySelectorAll('a').forEach((a) => a.classList.toggle('is-active', a.dataset.id === id))
    gooeySet.current?.(id)
    setLastSection?.(id)
  }, [setLastSection])
  const [covers, setCovers] = useState(null)
  const [cur, setCur] = useState(0)
  const [filter, setFilter] = useState('All')
  const [reel, setReel] = useState(null)
  const [repo, setRepo] = useState(0)
  const [menuKey, setMenuKey] = useState(0)
  const closeReel = useCallback(() => setReel(null), [])
  const vw = useViewport()
  const horizontal = useHorizontalMode()
  // Sections after the hero mount a group at a time in idle periods, so no single commit blocks input for long.
  const [stage, setStage] = useState(returnTo ? STAGES : 0)
  useEffect(() => {
    if (stage >= STAGES) return
    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 50))
    const id = idle(() => startTransition(() => setStage((n) => n + 1)), { timeout: 600 })
    return () => (window.cancelIdleCallback || clearTimeout)(id)
  }, [stage])
  const goTo = useHorizontal(wrapRef, trackRef, barRef, setActive, fxRef)

  useEffect(() => {
    // drawing the fallback covers is canvas work; keep it off the critical path
    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 300))
    const id = idle(() =>
      makeCovers(projects.filter((x) => !realImage(x)), 0.4).then((c) => {
        const drawn = Object.fromEntries(c.map((x) => [x.title, x.src]))
        setCovers(projects.map((x) => small(realImage(x)) || drawn[x.title]))
      }), { timeout: 2000 })
    return () => (window.cancelIdleCallback || clearTimeout)(id)
  }, [])

  useEffect(() => {
    if (returnTo) requestAnimationFrame(() => goTo(returnTo))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // reveal-on-enter; IntersectionObserver works for horizontally transformed panels too
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.2 }
    )
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [covers, stage])

  // The spiral needs more cards than there are projects to look full, so the set repeats.
  const workItems = useMemo(
    () => covers && [0, 1, 2].flatMap((r) => projects.map((x, i) => ({ id: `${x.slug}-${r}`, src: covers[i], label: x.title, alt: `${x.title}, ${x.kicker}`, href: `#/work/${x.slug}` }))),
    [covers]
  )
  const onSpiralCenter = useCallback((k) => setCur(k % projects.length), [])
  const cats = useMemo(() => ['All', ...new Set(archive.map((a) => a.c))], [])
  const shown = filter === 'All' ? archive : archive.filter((a) => a.c === filter)
  const p = projects[cur]
  const techSize = Math.round(Math.min(vw * 0.11, 170))
  const axis = horizontal ? 'x' : 'y'

  // The milestone stack waits on card 01 until its panel is actually on screen, and only steps while it is.
  const journeyRef = useRef()
  const [journeyOn, setJourneyOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setJourneyOn(e.isIntersecting), { threshold: 0.5 })
    if (!journeyRef.current) return
    io.observe(journeyRef.current)
    return () => io.disconnect()
  }, [stage])
  const nav = (id) => (e) => {
    e.preventDefault()
    goTo(id)
    setLastSection?.(id)
  }

  return (
    <>
      <a className="skip" href="#work" onClick={nav('work')}>Skip to work</a>

      {vw >= 900 ? (
        <header className="nav">
          <Logo onClick={nav('home')} />
          <div className="nav__gooey">
            <NavGooey bind={bindGooey} onGo={nav} />
          </div>
          <div className="nav__ext">
            <Ext href={links.github}>GitHub</Ext>
            <Ext href={links.linkedin}>LinkedIn</Ext>
            <Ext href={links.resume} className="pill">Résumé</Ext>
          </div>
        </header>
      ) : (
        <div className="sm-wrap" onClickCapture={(e) => e.target.closest('.sm-panel-item') && setTimeout(() => setMenuKey((k) => k + 1), 350)}>
          <StaggeredMenu
            key={menuKey}
            isFixed
            position="right"
            colors={['#1a1a18', '#c6ff3d']}
            accentColor="#c6ff3d"
            menuButtonColor="#f2f2f0"
            openMenuButtonColor="#0a0a0a"
            items={[...NAV.map(([id, label]) => ({ label, link: `#${id}`, ariaLabel: `Go to ${label}` })), { label: 'About', link: '#/about', ariaLabel: 'Open the about page' }]}
            socialItems={[{ label: 'GitHub', link: links.github }, { label: 'LinkedIn', link: links.linkedin }, { label: 'Résumé', link: links.resume }, { label: 'Email', link: `mailto:${links.email}` }]}
            onNavigate={(id) => { goTo(id); setLastSection?.(id); }}
          />
        </div>
      )}

      <div className="progress"><div ref={barRef} /></div>
      <SquaresFx fxRef={fxRef} />

      <main ref={wrapRef} className="hwrap">
        <div className="sticky">
          <div ref={trackRef} className="track">
            {/* HERO */}
            <section id="home" className="panel hero" aria-label="Introduction">
              {/* depth, back to front: atmosphere, sharp portrait, lighting + vignette, glass, grain, then the text */}
              <HeroPhoto compact={!horizontal} />
              <div className="hero__light" aria-hidden="true" />
              <div className="hero__glass" aria-hidden="true" />
              <div className="hero__grain" aria-hidden="true" />
              <p className="hero__stack">React, Next.js, Node.js, FastAPI, Python and MongoDB, shipped as real products.</p>
              <ul className="hero__facts">
                <li>New Delhi, India</li>
                  <li>BCA | GGSIPU | 9.1 CGPA</li>
                </ul>
              <div className="hero__content">
                <TextType as="p" className="eyebrow hero__type" text={['FULL-STACK DEVELOPER', 'AI & NLP BUILDER', 'DATA ANALYTICS', 'SYSTEM ARCHITECT']} typingSpeed={55} deletingSpeed={28} pauseDuration={2200} cursorCharacter="_" />
                <h1 className="hero__name">
                  <span className="mask"><span>ARNAV</span></span>
                  <span className="mask"><span>MEHTA.<em>.</em></span></span>
                </h1>
                <p className="hero__sub">
                  I build real products at the point where <i>code</i>, <i>intelligence</i> and <i>interaction</i> meet.
                </p>
                <div className="hero__cta">
                  <a href="#work" className="btn" onClick={nav('work')}>View work</a>
                  <Ext href={links.resume} className="btn btn--ghost">Résumé</Ext>
                </div>
              </div>
            </section>

            {stage >= 1 && <>
            {/* WHAT I DO: bento */}
            <section id="proof" className="panel proof" data-nav="home" aria-label="What I do">
              <h2 className="sr-only">What I do</h2>
              <div className="proof__head rv">
                <Tech text="I BUILD." size={techSize} />
                <p className="proof__lede">
                  Engineering robust web platforms, intelligent AI retrieval pipelines, and interactive data analytics dashboards.
                </p>
              </div>
              <div className="bento">
                {proof.map((x, i) => {
                  const isClickable = Boolean(x.slug)
                  return (
                    <article
                      key={x.k}
                      className={`bento__cell bento__cell--${i + 1} ${isClickable ? 'bento__cell--clickable' : ''} rv`}
                      style={{ transitionDelay: `${i * 90}ms` }}
                      onClick={isClickable ? () => onOpen(x.slug) : undefined}
                      role={isClickable ? 'button' : undefined}
                      tabIndex={isClickable ? 0 : undefined}
                      onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(x.slug); } } : undefined}
                      aria-label={isClickable ? `View ${x.tag || x.k} case study` : undefined}
                    >
                      <div className="bento__stage" aria-hidden="true">
                        {x.shot ? (
                          <div className="bento__frame">
                            <img
                              src={x.shot}
                              alt={x.tag || x.k}
                              className="bento__img"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        ) : x.tech ? (
                          <div className="bento__ship-grid">
                            {x.tech.map((t) => (
                              <div key={t.name} className="bento__ship-card">
                                <img
                                  src={`https://cdn.simpleicons.org/${t.icon}/${t.color.replace('#', '')}`}
                                  alt=""
                                  className="bento__ship-icon"
                                  width="20"
                                  height="20"
                                  loading="lazy"
                                  decoding="async"
                                />
                                <span className="bento__ship-name">{t.name}</span>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      <div className="bento__scrim" aria-hidden="true" />
                      <div className="bento__text">
                        {x.tag && <span className="bento__badge">{x.tag}</span>}
                        <h3>{x.k}</h3>
                        <p>{x.body}</p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>

            {/* FEATURED WORK */}
            <section id="work" className="panel work" aria-label="Featured work">
              <div className="work__info">
                <p className="eyebrow"><Suspense fallback="Featured work"><DecryptedText text="Featured work" animateOn="view" sequential speed={40} revealDirection="start" /></Suspense></p>
                <div key={p.slug} className="work__detail">
                  <span className="status">{p.status}</span>
                  <h2>{p.title}</h2>
                  <p className="it work__kicker">{p.kicker}</p>
                  <p className="work__sum">{p.summary}</p>
                  {p.note && <p className="note">{p.note}</p>}
                  <ul className="chips">
                    {p.tech.slice(0, 5).map((t) => <li key={t}>{t}</li>)}
                  </ul>
                  <div className="work__actions">
                    <button className="btn" onClick={() => onOpen(p.slug)}>Case study</button>
                    {p.live && <Ext href={p.live} className="btn btn--ghost">Live site</Ext>}
                  </div>
                </div>
                <div className="work__list" role="group" aria-label="Featured projects">
                  {projects.map((x, i) => (
                    <button key={x.slug} className={i === cur ? 'on' : ''} onClick={() => onOpen(x.slug)} onMouseEnter={() => setCur(i)}>
                      {x.title}
                    </button>
                  ))}
                </div>
              </div>
              <div className="work__acc">
                {workItems ? (
                  // animationMode="auto": it spins on its own and never listens to scroll or drag, so the page scrolls freely over it
                  <div className="work__spiral">
                    <InfiniteSpiral
                      key={horizontal ? 'h' : 'v'}
                      items={workItems}
                      animationMode="auto"
                      speed={0.4}
                      radius={horizontal ? 250 : 120}
                      cardWidth={horizontal ? 308 : 176}
                      cardHeight={horizontal ? 140 : 80}
                      verticalSpacing={horizontal ? 64 : 42}
                      cardsPerTurn={6}
                      cardRadius={10}
                      centerScale={1.22}
                      edgeFade={0.35}
                      edgeBlur={4}
                      imageFit="fill"
                      pauseOnHover={fine}
                      onCenterChange={onSpiralCenter}
                    />
                  </div>
                ) : (
                  <div className="skeleton" aria-hidden="true" />
                )}
                <p className="work__tip">{fine ? 'Hover to pause. Click a card to open the case study.' : 'Tap a card to open the case study.'}</p>
              </div>
            </section>
            </>}
            {stage >= 2 && <>
            {/* SHOWREELS: video playing inside the project name */}
            {projects.filter((x) => x.loop).map((x, i) => (
              <Reel
                key={x.slug}
                id={`reel-${x.slug}`}
                nav="work"
                index={`Reel 0${i + 1}`}
                title={x.title}
                kicker={x.kicker}
                loop={x.loop}
                poster={x.poster || x.shot}
                color={x.color}
                tint={x.tint}
                onPlay={() => setReel(x)}
              />
            ))}

            {/* LIVE ON THE WEB: floating cards joined by a drawn line */}
            <section id="live" className="panel live" data-nav="work" aria-label="Live on the web">
              <div className="live__head rv">
                <p className="eyebrow">Keep scrolling</p>
                <h2 className="live__title">Live on<br />the web</h2>
                <p className="muted live__lede">Real sites you can open right now, from a paying client to side projects.</p>
              </div>
              <LiveBoard items={liveWork} onOpen={onOpen} />
            </section>

            </>}
            {stage >= 3 && <>
            {/* PROJECT INDEX: flowing menu */}
            <section id="index" className="panel pindex" data-nav="work" aria-label="Project index">
              <div className="pindex__head rv">
                <p className="eyebrow">Index</p>
                <h2>Every<br /><span className="it">project</span></h2>
                <p className="muted">Hover a row to see it. Click to open the case study or the live site.</p>
              </div>
              <div className="pindex__menu">
                <Suspense fallback={null}><FlowingMenu items={indexItems} speed={18} textColor="#f2f2f0" bgColor="#0a0a0a" marqueeBgColor="#c6ff3d" marqueeTextColor="#0a0a0a" borderColor="rgba(255,255,255,.12)" /></Suspense>
              </div>
            </section>

            {/* ARCHIVE */}
            <section id="archive" className="panel archive" data-nav="work" aria-label="Project archive">
              <div className="archive__head rv">
                <h2>Rest of<br /><span className="it">the work</span></h2>
                <div className="filters" role="group" aria-label="Filter projects">
                  {cats.map((c) => (
                    <button key={c} className={filter === c ? 'on' : ''} onClick={() => setFilter(c)} aria-pressed={filter === c}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <ol className="archive__list">
                {shown.map((a, i) => {
                  const title = <b>{a.t}{a.note && <small className="note">{a.note}</small>}</b>
                  const cat = <span className="archive__cat">{a.c}</span>
                  const tag = <span className="tag">{a.s}</span>
                  return (
                    <li key={a.t} style={{ animationDelay: `${i * 35}ms` }}>
                      {a.url ? (
                        a.demoUrl ? (
                          <div className="archive__row archive__row--demo">
                            <a className="archive__area" href={a.url} target="_blank" rel="noreferrer">{title}{cat}</a>
                            <span className="archive__tagcell">
                              {tag}
                              <a className="archive__demo" href={a.demoUrl} target="_blank" rel="noreferrer">Live Demo</a>
                            </span>
                            <a className="archive__arrow" href={a.url} target="_blank" rel="noreferrer" aria-label={`${a.t} on GitHub`}><span className="arrow">↗</span></a>
                          </div>
                        ) : (
                          <Ext href={a.url} className="archive__row">{title}{cat}{tag}<span className="arrow">↗</span></Ext>
                        )
                      ) : (
                        <div className="archive__row">{title}{cat}{tag}<span /></div>
                      )}
                    </li>
                  )
                })}
              </ol>
            </section>

            </>}
            {stage >= 4 && <>
            {/* STATEMENT + single marquee */}
            <section id="statement" className="panel statement" data-nav="about" aria-label="Approach">
              <Later className="bigword" data-speed="0.25" aria-hidden="true">
                <Suspense fallback={null}><StrokeText text="SHIP" strokeColor="rgba(255,255,255,.18)" fillColor="transparent" strokeWidth={1} fontSize={300} fontWeight={700} letterSpacing={-14} trigger="inView" drawDuration={2.4} /></Suspense>
              </Later>
              <div className="statement__focus rv">
                <Suspense fallback="Code Design Interaction"><TrueFocus sentence="Code Design Interaction" blurAmount={4} borderColor="#c6ff3d" glowColor="rgba(198,255,61,.5)" animationDuration={0.6} pauseBetweenAnimations={1.4} /></Suspense>
              </div>
              <TextReveal axis={axis} className="statement__text rv">
                Ideas are easy. I&rsquo;d rather show you something that <em>runs</em>, <em>loads fast</em> and gets <em>used</em>.
              </TextReveal>
              <div className="logos" aria-label="Tools I use">
                <LogoLoop logos={logoRows[0]} speed={70} direction="left" logoHeight={40} gap={64} pauseOnHover scaleOnHover fadeOut fadeOutColor="#0a0a0a" ariaLabel="Tools I use" />
                <LogoLoop logos={logoRows[1]} speed={55} direction="right" logoHeight={40} gap={64} pauseOnHover scaleOnHover fadeOut fadeOutColor="#0a0a0a" ariaLabel="More tools I use" />
              </div>
            </section>

            {/* ABOUT: editorial layout */}
            <section id="about" className="panel about" aria-label="About">
              <div className="about__vword" aria-hidden="true"><span>{'About - '.repeat(8)}</span></div>
              <a href="#/about" className="about__portrait">
                <img src="/arnav-hero-photo.jpg" srcSet="/arnav-hero-photo.jpg" sizes="(max-width: 899px) 90vw, 35vw" alt="Arnav Mehta" loading="lazy" decoding="async" width="1100" height="1563" />
                <span className="sr-only">Read my story</span>
                <span className="about__badge" aria-hidden="true">
                  <Suspense fallback={null}><CircularText text="ARNAV MEHTA * NEW DELHI * READ MY STORY * " spinDuration={24} onHover="speedUp" /></Suspense>
                </span>
              </a>
              <div className="about__copy">
                <TextReveal as="blockquote" axis={axis} className="about__quote rv">
                  &ldquo;Engineering is how a product works. Intelligence is how it scales. <span className="hl">I care about both, and I build what matters.&rdquo;</span>
                </TextReveal>
                <p className="about__by rv">- Arnav Mehta, Full-stack developer & AI engineer</p>
                <div className="about__cols">
                  <TextReveal axis={axis} className="rv">
                    I'm a full-stack developer and AI builder specializing in Next.js, React, Node.js, and FastAPI. From orchestrating multi-source API pipelines to fine-tuning semantic search with LLMs, I turn complex data into clean applications.
                  </TextReveal>
                  <div className="rv">
                      <TextReveal axis={axis}>With an academic foundation at GGSIPU (9.1 CGPA), competitive hackathons, and industry internships, I ship production-ready software.</TextReveal>
                    <a href="#/about" className="about__link">About me</a>
                  </div>
                </div>
                <dl className="about__facts rv">
                  <div><dt>Education</dt><dd>BCA, GGSIPU (CGPA 9.1)</dd></div>
                    <div><dt>Recognition</dt><dd>McKinsey Forward 2026</dd></div>
                  <div><dt>Based in</dt><dd>New Delhi, India</dd></div>
                </dl>
              </div>
            </section>

            </>}
            {stage >= 5 && <>
            {/* JOURNEY: 3D milestone cards */}
            <section id="journey" className="panel journey" aria-label="Journey">
              <div className="journey__head rv">
                <h2>How I got<br /><span className="it">here</span></h2>
                <p className="muted">Academic foundation, internships, and hackathons.</p>
                <div className="journey__flap" aria-hidden="true">
                  <SplitFlapText words={['BCA', 'ANALYTICS', 'MERN', 'SIH 2026', 'CISCO', 'MCKINSEY', 'AI SPACE', 'ISRO', 'RBI90', 'GROWTH']} padTo={9} fontSize={22} gap={3} tileRadius={4} tileColor="#161616" textColor="#c6ff3d" cycleDelay={2200} />
                </div>
              </div>
              <div ref={journeyRef} className="journey__stage">
                {horizontal ? (
                  <>
                    <div className="jstack">
                      <Suspense fallback={null}><Stack cards={stackCards} sendToBackOnClick sensitivity={120} autoplay={journeyOn} autoplayDelay={4000} pauseOnHover animationConfig={{ stiffness: 240, damping: 24 }} /></Suspense>
                    </div>
                    <p className="journey__tip mono">Drag or click the card to flip through {journey.length} milestones</p>
                  </>
                ) : (
                  <ScrollStack className="jscroll" itemDistance={40} itemStackDistance={18} stackPosition="12vh" baseScale={0.9} itemScale={0.012}>
                    {journey.map((m, i) => (
                      <ScrollStackItem key={m.t} itemClassName="jslot"><Milestone m={m} i={i} /></ScrollStackItem>
                    ))}
                  </ScrollStack>
                )}
              </div>
            </section>

            {/* SKILLS */}
            <section id="skills" className="panel skills" aria-label="Skills">
              <div className="skills__head rv">
                <h2>Skills,<br /><span className="it">with receipts</span></h2>
                <p className="muted">Each group names the work where it was actually used.</p>
                {horizontal && (
                  <InView className="skills__cubes">
                    <Cubes gridSize={8} maxAngle={50} radius={3} faceColor="#0d0d0d" borderStyle="1px solid rgba(255,255,255,.2)" rippleColor="#c6ff3d" rippleSpeed={1.6} autoAnimate rippleOnClick />
                  </InView>
                )}
              </div>
              <div className="skills__main">
                <div className="skills__grid">
                  {skills.map((g, i) => (
                    <article key={g.g} className="skill rv" style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
                      <h3>{g.g}</h3>
                      <ul>{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
                      {g.used && <p className="skill__used">Used in {g.used}</p>}
                    </article>
                  ))}
                </div>
                <div className="skillbar">
                  <InView className="skillbar__bg">
                    <Strands colors={['#c6ff3d', '#3dd9ff', '#ff5c39']} count={4} speed={0.35} glow={2} intensity={0.5} taper={0} />
                  </InView>
                  <LogoLoop logos={allSkills} speed={60} direction="left" logoHeight={20} gap={44} fadeOut fadeOutColor="#0a0a0a" ariaLabel="Every skill" />
                </div>
              </div>
            </section>

            </>}
            {stage >= 6 && <>
            {/* LAB */}
            <section id="lab" className="panel lab" data-nav="skills" aria-label="Lab and creative work">
              <div className="lab__copy rv">
                <p className="eyebrow">Lab</p>
                <h2><GlitchText speed={0.8} enableShadows enableOnHover className="lab__glitch">Experiments</GlitchText><span className="it">and creativity</span></h2>
                <p className="muted">
                  A collection of digital experiences, product interfaces, I've designed and developed.
                </p>
                <ul className="lab__list">
                  <li><Ext href="https://github.com/devranveer/Nexora">Nexora AI <span>React · FastAPI · PostgreSQL · Gemini AI ↗</span></Ext></li>
                  <li><Ext href="https://archerdune.vercel.app/">Archer&Dune <span>Next.js, Three.js, and GSAP ↗</span></Ext></li>
                </ul>
              </div>
              <div className="lab__scene">
                <div className="lab__grid" />
                <span className="lab__w lab__w1">CODE</span>
                <span className="lab__w lab__w2">data</span>
                <span className="lab__w lab__w3">INTELLIGENCE</span>
                {fine ? <Later className="lab__trail"><Suspense fallback={null}><ImageTrail items={trailImages} variant={1} /></Suspense></Later> : <div className="lab__trail" />}
              </div>
            </section>

            {/* NUMBERS + REPOS */}
            <section id="github" className="panel github" data-nav="skills" aria-label="GitHub and achievements">
              <h2 className="rv">Proof in<br /><span className="it">numbers</span></h2>
              <div className="stats">
                {achievements.map((a, i) => (
                  <div
                    key={a.n}
                    className="stat rv"
                    style={{
                      transitionDelay: `${i * 80}ms`,
                      position: 'relative',
                      padding: '2.2rem',
                    }}
                  >
                    <strong>{a.n}</strong>
                    <p
                      style={{
                        marginTop: '1rem',
                        color: '#cfcfcb',
                      }}
                    >
                      {a.label}
                    </p>
                    {a.caption && (
                      <span
                        style={{
                          marginTop: '.4rem',
                          fontSize: '1rem',
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          color: '#c6ff3d',
                        }}
                      >
                        {a.caption}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="repos rv">
                <h3>On GitHub</h3>
                <div className="repos__wheel">
                  <OptionWheel items={repos.map((r) => r.n)} defaultSelected={0} onChange={(k) => setRepo(k)} fontSize={1.35} spacing={1.7} inset={0} tilt={8} blur={1.5} activeColor="#c6ff3d" textColor="#8d8d8a" />
                </div>
                <p className="repos__desc">{repos[repo].d}</p>
                <Ext href={repos[repo].u} className="btn btn--ghost repos__open">Open {repo === repos.length - 1 ? 'GitHub' : 'repository'} ↗</Ext>
              </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="panel contact" aria-label="Contact">
              <div className="contact__main">
                <Tech text="LET'S TALK" size={Math.round(techSize * (horizontal ? 0.6 : 0.9))} />
                <a className="contact__mail" href={`mailto:${links.email}`}>{links.email}</a>
                <div className="contact__row">
                  <a className="btn" href={`mailto:${links.email}`}>Email me</a>
                  <Ext href={links.linkedin} className="btn btn--ghost">LinkedIn</Ext>
                  <Ext href={links.github} className="btn btn--ghost">GitHub</Ext>
                  <Ext href={links.resume} className="btn btn--ghost">Résumé</Ext>
                </div>
              </div>
              <Connect />
              <footer className="foot">
                <span className="foot__brand">
                  <span>
                    <b>Arnav Mehta</b>
                    <small>Full-Stack Developer <i aria-hidden="true" /> AI Engineer <i aria-hidden="true" /> BCA | GGSIPU | 9.1 CGPA</small>
                  </span>
                </span>
                <span>Updated 2026</span>
              </footer>
            </section>
            </>}
          </div>
        </div>
      </main>
      <VideoModal src={reel?.video} poster={reel?.poster || reel?.shot} title={reel?.title} onClose={closeReel} />
    </>
  )
}