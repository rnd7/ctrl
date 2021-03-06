# CTRL
Generic user interface components designed to interact with synthesizers or other realtime applications.

## Download
[Builds](https://github.com/rnd7/ctrl/tree/master/dist)

## Example
Navigate to [CTRL](https://rnd7.github.io/ctrl/)

## Installation

```bash
npm i @rnd7/ctrl

```

## Include

Via script tag
```
<script src="node_modules/@rnd7/ctrl/dist/ctrl-min.js"></script>
```

Using require
```javascript
const ctrl = require('@rnd7/ctrl')
```

Using import
```javascript
import { Rotary } from '@rnd7/ctrl'
```

## Usage
```javascript
new Rotary({ selector:'#rotary' }).on("change", e => console.log(e.detail.value))
```

## Defaults

```javascript
{
  observeSize: false, // poll for parent size changes
  sizeFromParent: true, // fit within parent bounds
  eventMode: VALUE, // define when change events are triggered
  speed: .01, // value per frame
  value: 0., // 0-1
  initialChangeEvent: true, // trigger change event when listener added
  keepTarget: false, // value setter does not overwrite target  
  disabled: false, // non interactive
  neutralAngle: -HALF_PI, // track orientation
  borderRadius: 2,
  borderColor: 'rgb(12,12,12)',
  borderFocusColor: 'rgb(0,0,80)',
  backgroundColor: 'rgb(36,36,36)',
  steps: 0, // 2-n to specify steps
  stepGap: TAU / 360, // stepper only. gap between segments
  trackSize: 12, // width of the track
  trackSector: TAU * .8, // track span as circular sector
  trackSectorColor: 'rgb(66,66,66)',
  valueSector: TAU / 48, // size of value indicator
  valueSectorColor: 'rgb(255,255,255)',
  targetSector: TAU / 48, // size of target indicator
  targetSectorColor: 'rgba(170,170,255,.5)',
}
```

## API

These method are primarily used by the component itself but you might also call those intentionally.
```javascript
startDrag(e)
drag(e)
stopDrag(e)
focus(e)
blur(e)
```

Register event listeners. Listen for the "change" event to react on user interaction.
```javascript
on(...args)
addEventListener(...args)
off(...args)
removeEventListener(...args)
```

Assign mutliple values at once. Pass one or more Objects as args. Those values are guaranteed not interfere.
```javascript
assign(...args)
```

Getters and Setters
```javascript
set selector(val)
get selector()
set parent(val)
get parent()
set initialChangeEvent(val)
get initialChangeEvent()
set eventMode(val)
get eventMode()
set value(val)
get value()
set trackSector(val)
get trackSector()
set target(val)
get target()
set keepTarget(val)
get keepTarget()
set steps(val)
get steps()
set step(val) // virtual, affecting value
get step() // virtual, returns transformed value
set targetStep(val) // virtual, affecting target
get targetStep() // virtual, returns transformed target
set neutralAngle(val)
get neutralAngle()
set sizeFromParent(val)
get sizeFromParent()
set width(val)
get width()
set height(val)
get height()
set speed(val)
get speed()
set targetSector(val)
get targetSector()
set valueSector(val)
get valueSector()
set stepGap(val)
get stepGap()
set disabled(val)
get disabled()
set observeSize(val)
get observeSize()
set borderRadius(val)
get borderRadius()
set trackSize(val)
get trackSize()
set valueSectorColor(val)
get valueSectorColor()
set trackSectorColor(val)
get trackSectorColor()
set borderColor(val)
get borderColor()
set borderFocusColor(val)
get borderFocusColor()
set backgroundColor(val)
get backgroundColor()
set targetSectorColor(val)
get targetSectorColor()
get domElement() // getter only
```

Force resize and draw
```javascript
fitParent()
redraw()
```

Event Modes
```javascript
export const NONE = "none" // no events fired
export const VALUE = "value" // only on value changes
export const TARGET = "target" // only on target changes
export const STEP = "step" // only on step changes
export const COMPLETE = "complete" // only when value reaches target
export const ALWAYS = "always" // while user interacts
```

## Development
You need git and npm.

Get the sources
```bash
git clone https://github.com/rnd7/ctrl.git
```

Install development devDependencies such as gulp and webpack.
```bash
npm install
```

Build example and watch changes (no hot reload)
```bash
npm run watch
```

Open example in your favorite browser.
```
docs/index.html
```

Production build
```bash
npm run build
```


## License
See the [LICENSE](https://github.com/rnd7/ctrl/tree/master/LICENSE.md) file for software license rights and limitations (MIT).
