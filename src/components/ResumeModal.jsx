import { useEffect, useRef, useState } from 'react'
import { links } from '../data.js'
import './ResumeModal.css'

const PDF = links.resume
const IMG = '/media/resume-preview.png'

// Any link to the résumé PDF opens this preview instead of leaving the page.
// Delegated, so Home, About, Case Study and the mobile menu all share one behaviour.
export default function ResumeModal() {
  const [open, setOpen] = useState(false)
  const boxRef = useRef()
  const lastFocus = useRef()

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return
      const a = e.target.closest?.('a[href]')
      if (!a || a.hasAttribute('download') || a.closest('.resume')) return
      if (new URL(a.href, location.href).pathname !== PDF) return
      e.preventDefault()
      lastFocus.current = a
      setOpen(true)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    boxRef.current?.focus()
    return () => {
      removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      lastFocus.current?.focus?.()
    }
  }, [open])

  if (!open) return null
  const close = () => setOpen(false)
  return (
    <div className="resume" role="dialog" aria-modal="true" aria-label="Résumé preview">
      <button className="resume__bg" onClick={close} aria-label="Close résumé" tabIndex={-1} />
      <div className="resume__box" ref={boxRef} tabIndex={-1}>
        <header className="resume__bar">
          <div className="resume__title">
            <span className="mono">Résumé</span>
            <b>Arnav Mehta</b>
          </div>
          <div className="resume__actions">
            <a className="btn resume__dl" href={PDF} download="Arnav_Mehta_Resume.pdf">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" /></svg>
              Download PDF
            </a>
            <a className="btn btn--ghost resume__open" href={PDF} target="_blank" rel="noreferrer">Open</a>
            <button className="resume__x" onClick={close} aria-label="Close résumé">×</button>
          </div>
        </header>
        <div className="resume__scroll" data-lenis-prevent>
          <img className="resume__page" src={IMG} alt="Arnav Mehta Résumé: Education, Technical Skills, Projects, Experience, Hackathons & Achievements" width="1700" height="2200" decoding="async" />
        </div>
      </div>
    </div>
  )
}