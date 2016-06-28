const context = require('audio-context')
const Kick = require('./kick')
const Snare = require('./snare')
const Hihat = require('./hihat')

function Drummer (options) {
  options = options || {}
  if (!(this instanceof Drummer)) return new Drummer(options)
  const kick = new Kick(context, options.kick)
  const snare = new Snare(context, options.snare)
  const hihat = new Hihat(context, options.hihat)

  return {
    kick,
    snare,
    hihat,
    context
  }
}

module.exports = Drummer
