module.exports = Snare

function Snare (context, opts) {
  opts = opts || {}
  this.context = context
}

Snare.prototype.createBuffer = function createBuffer () {
  const bufferSize = this.context.sampleRate
  const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate)
  let output = buffer.getChannelData(0)

  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1
  }

  return buffer
}

Snare.prototype.hit = function hit (time) {
  const noise = this.context.createBufferSource()
  noise.buffer = this.createBuffer()

  const noiseFilter = this.context.createBiquadFilter()
  noiseFilter.type = 'highpass'
  noiseFilter.frequency.value = 1000
  noise.connect(noiseFilter)

  const noiseEnvelope = this.context.createGain()
  noiseFilter.connect(noiseEnvelope)
  noiseEnvelope.connect(this.context.destination)

  const oscillator = this.context.createOscillator()
  oscillator.type = 'triangle'

  const oscEnvelope = this.context.createGain()
  oscillator.connect(oscEnvelope)
  oscEnvelope.connect(this.context.destination)

  noiseEnvelope.gain.setValueAtTime(1, time)
  noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2)
  noise.start(time)

  oscillator.frequency.setValueAtTime(100, time)
  oscEnvelope.gain.setValueAtTime(0.7, time)
  oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1)
  oscillator.start(time)

  oscillator.stop(time + 0.2)
  noise.stop(time + 0.2)
}
