import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AutoVideo } from './Reel.jsx'
import { srcSet } from '../img.js'
import './LiveBoard.css'

const host = (u) => (u ? u.replace(/^https?:\/\//, '').replace(/\/$/, '') : '')

// One continuous line runs through the whole board like a graph: it enters the first card, passes behind each card
// and bends across the gap to the next, then runs off the end. Beside each other (the sideways track) it leaves a
// card's right edge for the next one's left edge; in a single column it drops from bottom to top.
function build(rects) {
  const nodes = []
  const beside = rects.length > 1 && rects[1].left >= rects[0].right - 4
  const mid = (r) => r.top + r.height * 0.5
  const cx = (r) => r.left + r.width * 0.5
  const r0 = rects[0]
  let d = beside ? `M${r0.left - 110} ${mid(r0)}H${r0.right}` : `M${cx(r0)} ${r0.top - 70}V${r0.end}`
  for (let i = 1; i < rects.length; i++) {
    const a = rects[i - 1]
    const b = rects[i]
    if (beside) {
      const m = (b.left - a.right) / 2
      d += `H${a.right + m * 0.45}L${b.left - m * 0.45} ${mid(b)}H${b.right}`
      nodes.push([a.right, mid(a)], [b.left, mid(b)])
    } else {
      const x1 = cx(a)
      const x2 = cx(b)
      const y1 = a.end
      const m = y1 + (b.top - y1) * 0.5
      const k = Math.sign(x2 - x1) * 14
      d += `V${m - 14}L${x1 + k} ${m}H${x2 - k}L${x2} ${m + 14}V${b.end}`
      nodes.push([x1, y1], [x2, b.top])
    }
  }
  const z = rects[rects.length - 1]
  d += beside ? `H${z.right + 110}` : `V${z.end + 70}`
  return { d, nodes }
}

export default function LiveBoard({ items, onOpen }) {
  const boardRef = useRef()
  const cardRefs = useRef([])
  const [graph, setGraph] = useState({ d: '', nodes: [] })
  const [on, setOn] = useState(false)

  useLayoutEffect(() => {
    const board = boardRef.current
    const draw = () => {
      const o = board.getBoundingClientRect()
      const rects = cardRefs.current.filter(Boolean).map((el) => {
        const m = el.querySelector('.lcard__media').getBoundingClientRect()
        const c = el.getBoundingClientRect()
        // offsets from the board, using the media box (not the caption) as the anchor
        return { left: m.left - o.left, right: m.right - o.left, top: m.top - o.top, bottom: m.bottom - o.top, width: m.width, height: m.height, end: c.bottom - o.top + 18 }
      })
      if (rects.length) setGraph(build(rects))
    }
    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(board)
    cardRefs.current.forEach((el) => el && ro.observe(el))
    return () => ro.disconnect()
  }, [items])

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.01 })
    io.observe(boardRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={boardRef} className={`lboard ${on ? 'in' : ''}`}>
      <svg className="lboard__lines" aria-hidden="true">
        {graph.d && (
          <>
            <path className="lline lline--depth" d={graph.d} />
            <path className="lline lline--main" d={graph.d} pathLength="1" />
            <path className="lline lline--flow" d={graph.d} />
            {graph.nodes.map(([x, y], i) => (
              <g key={i} className="lnode" style={{ transitionDelay: `${0.5 + i * 0.12}s` }}>
                <rect x={x - 3} y={y - 3} width="14" height="14" className="lnode__depth" />
                <rect x={x - 7} y={y - 7} width="14" height="14" className="lnode__face" />
              </g>
            ))}
            <g className="lpulse">
              <circle r="16" className="lpulse__halo"><animateMotion dur="9s" repeatCount="indefinite" path={graph.d} /></circle>
              <circle r="5.5" className="lpulse__dot"><animateMotion dur="9s" repeatCount="indefinite" path={graph.d} /></circle>
            </g>
          </>
        )}
      </svg>
      {items.map((w, i) => (
        <article key={w.t} ref={(el) => (cardRefs.current[i] = el)} className="lcard" style={{ '--i': i }}>
          <a className="lcard__media" href={w.demoUrl || w.url} target="_blank" rel="noreferrer" aria-label={`${w.t}: open live site`}>
            <i className="tick tl" /><i className="tick tr" /><i className="tick bl" /><i className="tick br" />
            {w.loop ? (
              <AutoVideo src={w.loop} poster={w.shot} />
            ) : (
              <img src={w.shot} srcSet={srcSet(w.shot)} sizes="(max-width: 899px) 86vw, 32vw" alt={`${w.t} homepage`} loading="lazy" decoding="async" />
            )}
            <span className="lcard__tag">{w.slug ? 'Case study' : 'Web design'}</span>
          </a>
          <div className="lcard__meta">
            <h3>{w.t}</h3>
            {w.url && <a className="lcard__visit" href={w.url} target="_blank" rel="noreferrer" aria-label={`Visit ${host(w.url)}`}>Visit <span aria-hidden="true">↗</span></a>}
          </div>
          <p className="lcard__d">{w.d}</p>
          {w.note && <p className="note">{w.note}</p>}
          {w.slug && <button className="lcard__cs" onClick={() => onOpen(w.slug)}>Read the case study <span aria-hidden="true">→</span></button>}
        </article>
      ))}
    </div>
  )
}
