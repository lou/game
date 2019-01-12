import { canvas, ctx } from './canvas'
import { keysMap } from './keys'

const heroDefault = {
  speed: 6,
  width: 30,
  height: 30,
  x: canvas.width / 2 - 20,
  y: canvas.height - 60,
  hit: false,
  opacity: 1
}

export let hero = { ...heroDefault }

const moveHero = () => {
  if (keysMap['ArrowUp']) {
    hero.y -= hero.speed
  }
  if (keysMap['ArrowDown']) {
    hero.y += hero.speed
  }
  if (keysMap['ArrowLeft']) {
    hero.x -= hero.speed
  }
  if (keysMap['ArrowRight']){
    hero.x += hero.speed
  }
  // Wall collision
  hero.x = Math.max(Math.min(hero.x, canvas.width - hero.width), 0)
  hero.y = Math.max(Math.min(hero.y, canvas.height - hero.height), 0)
}

let opacityDirection = -1

export const drawHero = () => {
  moveHero()
  if (hero.hit) {
    hero.opacity += opacityDirection * 0.08
    if (hero.opacity <= 0.2) opacityDirection = 1
    if (hero.opacity >= 1) opacityDirection = -1
    ctx.fillStyle = `rgb(223, 147, 80, ${hero.opacity})`
  } else {
    hero.opacity = 1
    ctx.fillStyle = `rgb(0, 0, 0, ${hero.opacity})`
  }
  ctx.fillRect(hero.x, hero.y, hero.width, hero.height)
}

export const resetHero = () => {
  hero = { ...heroDefault }
}
