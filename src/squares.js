/* Pixel-block sweep drawn between sections: a band of black and lime squares travels from the far right of the
   screen to the far left as a section boundary crosses it, dithered at both edges, so the old section is
   covered on the right and the next one is revealed behind it on the left. set(u): u = 0..1 progress, 0 = idle. */
const BAND = 0.5
export function createSquares(canvas) {
  const ctx = canvas.getContext('2d')
  let cells = []
  let cols = 0
  let cell = 0
  let dpr = 1
  let last = -1

  const resize = () => {
    dpr = Math.min(2, devicePixelRatio || 1)
    const W = innerWidth
    const H = innerHeight
    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    cell = Math.ceil(W / (W < 900 ? 6 : 14))
    cols = Math.ceil(W / cell)
    const rows = Math.ceil(H / cell)
    // a little left-to-right structure in the random order, so it reads as a wave rather than static
    cells = Array.from({ length: cols * rows }, (_, i) => ({ x: 1 - (i % cols) / (cols - 1), n: Math.random(), lime: Math.random() < 0.4 }))
    last = -1
  }

  const set = (u) => {
    const q = u <= 0.004 || u >= 0.996 ? 0 : Math.round(u * 60) / 60
    if (q === last) return
    last = q
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    if (!q) return
    const front = q * (1 + BAND)
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i]
      const d = front - c.x
      // inside the travelling band, the chance of a square being on follows a bell, so the edges dissolve
      if (d <= 0 || d >= BAND || c.n >= Math.sin((Math.PI * d) / BAND) * 1.15) continue
      ctx.fillStyle = c.lime ? '#c6ff3d' : '#000'
      const x = (i % cols) * cell
      const y = Math.floor(i / cols) * cell
      ctx.fillRect(x, y, cell + 0.5, cell + 0.5)
      // a hairline bevel gives each block a little depth
      ctx.fillStyle = c.lime ? 'rgba(0,0,0,.14)' : 'rgba(198,255,61,.16)'
      ctx.fillRect(x, y, cell, 1.5)
      ctx.fillRect(x, y, 1.5, cell)
    }
  }

  resize()
  return { set, resize }
}
