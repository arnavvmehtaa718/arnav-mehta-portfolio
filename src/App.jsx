import { lazy, Suspense, useEffect, useState, Component } from 'react'
import Home from './Home.jsx'
import ClickSpark from './components/ClickSpark.jsx'
import InkCursor from './components/InkCursor.jsx'
import ResumeModal from './components/ResumeModal.jsx'

// Top-level error boundary: a render-time crash must not leave a blank page with no feedback.
class ErrorBoundary extends Component {
  constructor (props) { super(props); this.state = { err: null } }
  static getDerivedStateFromError (err) { return { err } }
  componentDidCatch (err, info) { console.error('Portfolio render error:', err, info?.componentStack) }
  render () { return this.state.err ? <div style={{ position: 'fixed', inset: 0, background: '#0a0a0a', color: '#f2f2f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter Tight, sans-serif', fontSize: '1.2rem', zIndex: 999, padding: '2rem', textAlign: 'center', whiteSpace: 'pre-wrap', maxWidth: '90vw' }}>Something broke on this page.<br />Check the console for details.<br /><br />{String(this.state.err && this.state.err.message ? this.state.err.message : this.state.err)}</div> : this.props.children }
}

// Hash routes: '#/work/<slug>' opens a case study, '#/about' the about page, anything else is home.
// Secondary routes load on demand
const HelloLoader = lazy(() => import('./components/HelloLoader.jsx'))
const CaseStudy = lazy(() => import('./CaseStudy.jsx'))
const AboutPage = lazy(() => import('./AboutPage.jsx'))

const readRoute = () => {
  if (location.hash === '#/about') return 'about'
  const m = location.hash.match(/^#\/work\/([\w-]+)/)
  return m ? m[1] : null
}

// The greeting loader is a desktop flourish; phones go straight to content.
const skipLoader = matchMedia('(prefers-reduced-motion: reduce), (max-width: 899px), (pointer: coarse)').matches

export default function App() {
  const [slug, setSlug] = useState(readRoute)
  const [returnTo, setReturnTo] = useState(null)
  const [lastSection, setLastSection] = useState('work')
  const [loading, setLoading] = useState(!skipLoader)

  // 'ready' releases the hero entrance animation, which waits behind the loader
  useEffect(() => {
    if (loading) return
    // without the loader to cover it, hold the hero text until the web fonts land (max 1.5s) so the swap can't shift it
    let done = false
    const go = () => {
      if (done) return
      done = true
      document.body.classList.add('ready')
      document.querySelector('.pre .hero')?.remove() // the static stand-in text from index.html
    }
    document.fonts.ready.then(go)
    const t = setTimeout(go, 1500)
    return () => clearTimeout(t)
  }, [loading])

  // Track lastSection when navigating to different pages
  useEffect(() => {
    const on = () => {
      const newSlug = readRoute()
      // When navigating to about page, track that we came from the 'about' section
      if (newSlug === 'about' && !slug) {
        setLastSection('about')
      }
      setSlug(newSlug)
    }
    addEventListener('hashchange', on)
    return () => removeEventListener('hashchange', on)
  }, [slug])

  const open = (s) => {
    location.hash = `/work/${s}`
  }
  const back = () => {
    setReturnTo(lastSection)
    history.pushState('', '', location.pathname)
    setSlug(null)
  }

  return (
    <ErrorBoundary>
      <ClickSpark sparkColor="#c6ff3d" sparkSize={11} sparkRadius={22} sparkCount={9} duration={450}>
        <InkCursor />
        <ResumeModal />
        {loading && <Suspense fallback={<div className="hello" aria-hidden="true" />}><HelloLoader onDone={() => setLoading(false)} /></Suspense>}
        <Suspense fallback={null}>
        {slug === 'about' ? (
          <AboutPage onBack={() => back('about')} />
        ) : slug ? (
          <CaseStudy key={slug} slug={slug} onBack={back} onOpen={open} />
        ) : (
          <Home onOpen={open} returnTo={returnTo} setLastSection={setLastSection} />
        )}
        </Suspense>
      </ClickSpark>
    </ErrorBoundary>
  )
}
