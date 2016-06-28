module.exports = Hihat

function Hihat (context, opts) {
  this.context = context
}

Hihat.prototype.hit = function hit (time) {
  const context = this.context
  const fundamental = 40
  const ratios = [2, 3, 4.16, 5.43, 6.79, 8.21]
  const now = context.currentTime + time
  const gain = context.createGain()

  const bandpass = context.createBiquadFilter()
  bandpass.type = 'bandpass'
  bandpass.frequency.value = 10000

  const highpass = context.createBiquadFilter()
  highpass.type = 'highpass'
  highpass.frequency.value = 7000

  bandpass.connect(highpass)
  highpass.connect(gain)
  gain.connect(context.destination)

  ratios.forEach((ratio) => {
    const oscillator = context.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.value = fundamental * ratio
    oscillator.connect(bandpass)
    oscillator.start(now)
    oscillator.stop(now + 0.3)
  })

  gain.gain.setValueAtTime(0.00001, now)
  gain.gain.exponentialRampToValueAtTime(1, now + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.3, now + 0.03)
  gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.3)
}
