import handlers from '../config-handlers.js'
export default handlers.find(h => h.ext === '.yml').handler
