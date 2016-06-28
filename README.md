# drummer
Drum synth

Combining stuff from the super awesome [Synthesising Drum Sounds with the Web Audio API](https://dev.opera.com/articles/drum-sounds-webaudio/) and [Synthesizing Hi-Hats with Web Audio](http://joesul.li/van/synthesizing-hi-hats/) to give you a little drum module.

## Install

`npm i drummer`

## Use

```javascript
const drummer = require('..')()
const kick = drummer.kick
const snare = drummer.snare
const hihat = drummer.hihat

kick.hit(0)
hihat.hit(0)
hihat.hit(0.25)

kick.hit(0.5)
snare.hit(0.5)
hihat.hit(0.5)
```
