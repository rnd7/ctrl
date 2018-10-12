import { Rotary } from '../ctrl'  // aka '@rnd7/ctrl'

window.addEventListener("load", e => {

  // most basic example, using defaults
  (() => {
    const rotary = new Rotary()
    rotary.speed = 0 // instant change
    // set the parent of the rotary to append it to the DOM
    rotary.parent = document.getElementById('rotary-1')
  })();


  // more sophisticated example
  (() => {
    const display = document.getElementById('rotary-2-display')
    new Rotary({
      selector:'#rotary-2',
      value:.5,
    }).on("change", e => {
      display.innerHTML = ((Math.round(e.detail.value * 100))/100).toFixed(2);
     })
  })();

  // Stepper with display
  (() => {
    const display = document.getElementById('rotary-3-display')
    const rotary = new Rotary({
      parent: document.getElementById('rotary-3'),
      step:12,
      targetStep: 0,
      steps:12,
      eventMode:"step"
    })
    rotary.on("change", e => { display.innerHTML = e.detail.step })
  })();

  // Styling Example
  (() => {
    const rotary = new Rotary({
      selector: '#rotary-4',
      borderRadius: 0,
      borderColor: 'rgba(255,255,255,.25)',
      borderFocusColor: 'rgba(255,255,255,.5)',
      backgroundColor: 'rgba(255,255,255,0)',
      trackSectorColor: 'rgba(0,0,0,.3)',
      valueSectorColor: 'rgba(255,255,255,.6)',
      targetSectorColor: 'rgba(0,0,0,.3)',
      trackSize: 24,
      steps:12,
      stepGap: 0,
      eventMode:"step"
    })
    rotary.assign(
      { target: 1. },
      { speed: .001 }
    )
  })();

  // Responsive Example
  (() => {
    const button = document.getElementById('rotary-5-button')
    const parent = document.getElementById('rotary-5')
    const rotary = new Rotary({
      parent,
      observeSize: true
    })
    button.addEventListener('click', (e) => {
      parent.classList.toggle('big')
    })
  })();
})
