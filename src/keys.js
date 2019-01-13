export let keysMap = {}

const UsableKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space']

export const populateKeysMap = () => {
  if (UsableKeys.includes(event.code)){
    keysMap[event.code] = event.type == 'keydown'
  }
}
