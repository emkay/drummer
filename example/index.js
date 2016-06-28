const drummer = require('..')()
const kick = drummer.kick
const snare = drummer.snare
const hihat = drummer.hihat

function bar (time) {
  if (time >= 20) return
  kick.hit(0 + time)
  hihat.hit(0 + time)
  hihat.hit(0.25 + time)

  kick.hit(0.5 + time)
  snare.hit(0.5 + time)
  hihat.hit(0.5 + time)

  hihat.hit(0.75 + time)

  kick.hit(1 + time)
  hihat.hit(1 + time)

  hihat.hit(1.25 + time)

  kick.hit(1.5 + time)
  snare.hit(1.5 + time)
  hihat.hit(1.5 + time)

  hihat.hit(1.75 + time)

  kick.hit(2 + time)
  hihat.hit(2 + time)

  hihat.hit(2.25 + time)

  kick.hit(2.5 + time)
  snare.hit(2.5 + time)
  hihat.hit(2.5 + time)

  snare.hit(2.75 + time)
  return bar(time + 3)
}

bar(0)
