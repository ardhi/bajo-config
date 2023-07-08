import handlers from '../extend/read-config.js'
export default handlers.find(h => h.ext === '.yaml').handler
