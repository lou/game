export const collision = (object1, object2) => {
  const xin = object2.x + object2.width >= object1.x && object2.x <= object1.x + object1.width
  const yin = object2.y + object2.height >= object1.y && object2.y <= object1.y + object1.height

  return xin && yin
}
