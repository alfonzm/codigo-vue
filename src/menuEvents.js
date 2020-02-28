const menuEvents = {}
const eventNames = [
  'NEW_NOTE',
  'NEW_FOLDER',
  'TOGGLE_SIDEBAR',
  'TOGGLE_PREVIEW',
  'TOGGLE_EDITOR',
  'TOGGLE_TOOLBAR',
]

eventNames.forEach(e => menuEvents[e] = e)

export default menuEvents