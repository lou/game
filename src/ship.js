import { canvas, ctx } from './canvas'
import { keysMap } from './keys'
import { collision } from './collision'

const shipDefault = {
  speed: 6,
  width: 30,
  height: 30,
  x: canvas.width / 2 - 20,
  y: canvas.height - 60,
  hit: false,
  opacity: 1
}

export let ship = { ...shipDefault }

const move = () => {
  if (keysMap['ArrowUp']) {
    ship.y -= ship.speed
  }
  if (keysMap['ArrowDown']) {
    ship.y += ship.speed
  }
  if (keysMap['ArrowLeft']) {
    ship.x -= ship.speed
  }
  if (keysMap['ArrowRight']){
    ship.x += ship.speed
  }
  // Wall collision
  ship.x = Math.max(Math.min(ship.x, canvas.width - ship.width), 0)
  ship.y = Math.max(Math.min(ship.y, canvas.height - ship.height), 0)
}


export let munitions = []
const defaultMunition = {
  width: 3,
  height: 3,
  speed: -10,
  power: 1
}

const drawMunitions = () => {
  munitions.forEach((munition, index) => {
    removeMunitionNotShown(munition, index)
    munition.y += munition.speed
    ctx.fillStyle = `rgb(0, 0, 0)`
    ctx.fillRect(munition.x, munition.y, munition.width, munition.height)
  })
}

const removeMunitionNotShown = (munition, index) => {
  if (munition.y <= 0) {
    munitions.splice(index, 1)
  }
}

const shoot = () => {
  if (keysMap['Space']) {
    munitions.push({
      ...defaultMunition,
      x: ship.x + ship.width / 2 - 2,
      y: ship.y
    })
  }
}

let opacityDirection = -1

const handleCollisions = () => {
  if (ship.hit) {
    ship.opacity += opacityDirection * 0.08
    if (ship.opacity <= 0.2) opacityDirection = 1
    if (ship.opacity >= 1) opacityDirection = -1
  } else {
    ship.opacity = 1
  }
}


export const drawShip = () => {
  move()
  shoot()
  drawMunitions()
  handleCollisions()
  ctx.fillStyle = `rgb(0, 0, 0, ${ship.opacity})`
  ctx.fillRect(ship.x, ship.y, ship.width, ship.height)
}

export const resetShip = () => {
  ship = { ...shipDefault }
}
