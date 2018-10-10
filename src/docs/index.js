import { Rotary } from '../ctrl'  // aka '@rnd7/ctrl'

window.addEventListener("load", e => {
  new Rotary({selector:'#rotary', value:1.0,  observeSize: true}).on("change", e => {console.log(e.detail.value)})
  var rot = new Rotary({parent: document.querySelector('#rotary-stepper'), value:1.0, steps:12})
  Object.assign(rot, {target: 0})
})
