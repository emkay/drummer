module.exports = Kick

function Kick (context, opts) {
  opts = opts || {}
  this.context = context
  this.type = opts.type || 'sine'
}

Kick.prototype.hit = function hit (time, opts) {
  opts = opts || {}
  const oscillator = this.context.createOscillator()
  const gain = this.context.createGain()
  const totalTime = time + this.context.currentTime

  oscillator.type = this.type
  oscillator.connect(gain)
  gain.connect(this.context.destination)

  oscillator.frequency.setValueAtTime(150, totalTime)
  gain.gain.setValueAtTime(1, time)
  oscillator.frequency.exponentialRampToValueAtTime(0.01, totalTime + 0.5)
  gain.gain.exponentialRampToValueAtTime(0.01, totalTime + 0.5)

  oscillator.start(totalTime)
  oscillator.stop(totalTime + 0.5)
}
