export const collision = (r, h) => {
  const xin = h.x + h.width >= r.x && h.x <= r.x + r.width
  const yin = h.y + h.height >= r.y && h.y <= r.y + r.height

  return xin && yin
}
