import { useEffect } from 'react'
import { createSquares } from '../squares.js'

// Fixed canvas for the pixel-block section transition. Home sets its strength from the scroll position.
export default function SquaresFx({ fxRef }) {
  useEffect(() => {
    const canvas = document.querySelector('.squares')
    const fx = createSquares(canvas)
    fxRef.current = fx
    addEventListener('resize', fx.resize)
    return () => {
      removeEventListener('resize', fx.resize)
      fxRef.current = null
    }
  }, [fxRef])
  return <canvas className="squares" aria-hidden="true" />
}
