
const TAU = Math.PI * 2
const HALF_PI = Math.PI / 2

function mod( a, n ) { return ( a % n + n ) % n }

function calcAngle(ax, ay, bx, by) {
  var angle = Math.atan2(by - ay, bx - ax)
  if ( angle < 0 ) angle += TAU
  return angle
}

function calcAngleDelta( current, target ) {
  var a = mod( ( current - target ), TAU )
  var b = mod( ( target - current ), TAU)
  return a < b ? -a : b
}

function clamp(val, min, max) {
  return Math.min(max || 1, Math.max(min || 0, val))
}

function drawTorusSegment(ctx, x, y, outer, inner, start, end) {
  start = start || 0
  end = end || TAU
  ctx.beginPath()
  ctx.arc(x, y, outer, start , end, false)
  ctx.arc(x, y, inner, end, start, true)
  ctx.closePath()
}

// Event Modes
export const NONE = "none" // no events fired
export const VALUE = "value" // only on value changes
export const TARGET = "target" // only on target changes
export const STEP = "step" // only on step changes
export const COMPLETE = "complete" // only when value reaches target
export const ALWAYS = "always" // while user interacts


export const ROTARY_DEFAULTS = {
  observeSize: false, // poll for parent size changes
  sizeFromParent: true, // fit within parent bounds
  eventMode: VALUE, // online fire events when value changed
  speed: .01, // value per frame 0 and 1 eq instant change
  value: 0., // 0-1
  initialChangeEvent: true, // trigger change event when listener added
  keepTarget: false, // value setter does not overwrite target
  disabled: false, // non interactive
  neutralAngle: -HALF_PI, // track orientation
  borderRadius: 2,
  borderColor: 'rgb(12,12,12)',
  borderFocusColor: 'rgb(0,0,80)',
  backgroundColor: 'rgb(36,36,36)',
  steps: 1, // 1-n to specify steps 1 is continous
  stepGap: TAU / 360, // stepper only. gap between segments
  trackSize: 12, // width of the track
  trackSector: TAU * .8, // track span as circular sector
  trackSectorColor: 'rgb(66,66,66)',
  valueSector: TAU / 48, // size of value indicator
  valueSectorColor: 'rgb(255,255,255)',
  targetSector: TAU / 48, // size of target indicator
  targetSectorColor: 'rgba(170,170,255,.5)',
}

export class Rotary {
  constructor(opts) {
    this._canvas = document.createElement('CANVAS')
    this._canvas.tabIndex = 0
    this._canvas.style.outline = 0
    this._canvas.style.userSelect = "none"
    this._canvas.style.cursor = "pointer"
    this._ctx = this._canvas.getContext("2d")
    this._target = null
    this._mouseX = 0.
    this._mouseY = 0.
    this._mouseAngle = 0.
    this._bound = {
      startDrag: this.startDrag.bind(this),
      stopDrag: this.stopDrag.bind(this),
      drag: this.drag.bind(this),
      focus: this.focus.bind(this),
      blur: this.blur.bind(this)
    }

    this.assign(ROTARY_DEFAULTS, opts)
    if (this.target === null) this.target = this.value // if no target use value

    this._canvas.addEventListener("mousedown", this._bound.startDrag)
    this._canvas.addEventListener("focus", this._bound.focus, true)
    this._canvas.addEventListener("blur", this._bound.blur, true)
  }

  startDrag(e) {
    if (this._disabled) return
    this._dragging = true
    this._canvas.removeEventListener("mousedown", this._bound.startDrag)
    this._canvas.removeEventListener("touchstart", this._bound.startDrag)
    document.addEventListener("mousemove", this._bound.drag)
    document.addEventListener("touchmove", this._bound.drag)
    document.addEventListener("mouseup", this._bound.stopDrag)
    document.addEventListener("mouseleave", this._bound.stopDrag)
    document.addEventListener("dragleave", this._bound.stopDrag)
    document.addEventListener("touchcancel", this._bound.stopDrag)
    document.addEventListener("touchend", this._bound.stopDrag)
    this._evalMousePosition(e)
  }

  drag(e) {
    if (this._disabled) return
    this._evalMousePosition(e)
  }

  stopDrag(e) {
    if (this._disabled) return
    this._dragging = false
    document.removeEventListener("mousemove", this._bound.drag)
    document.removeEventListener("touchmove", this._bound.drag)
    document.removeEventListener("mouseup", this._bound.stopDrag)
    document.removeEventListener("mouseleave", this._bound.stopDrag)
    document.removeEventListener("dragleave", this._bound.stopDrag)
    document.removeEventListener("touchcancel", this._bound.stopDrag)
    document.removeEventListener("touchend", this._bound.stopDrag)
    this._canvas.addEventListener("mousedown", this._bound.startDrag)
    this._canvas.addEventListener("touchstart", this._bound.startDrag)
    this._evalMousePosition(e)
  }

  focus(e) {
    if (this._disabled) return
    this._focus = true
    this.redraw()
  }

  blur(e) {
    if (this._disabled) return
    this._focus = false
    this.redraw()
  }

  on(...args) {
    this.addEventListener.apply(this, args)
  }

  addEventListener(...args) {
    this._canvas.addEventListener.apply(this._canvas, args)
    if (this._initialChangeEvent) this._dispatchChangeEvent(true)
  }

  off(...args) {
    this.removeEventListener.apply(this, args)
  }

  removeEventListener(...args) {
    this._canvas.removeEventListener.apply(this._canvas, args)
  }

  assign (...args) {
    this._bulkAssign = true
    args.forEach((arg) => {
      Object.assign(this, arg)
    })
    this._bulkAssign = false
    if (this._redraw) this._loop()
  }

  set initialChangeEvent(val) {
    if (this._initialChangeEvent == val) return
    this._initialChangeEvent = val
  }
  get initialChangeEvent() {
    return this._initialChangeEvent
  }

  set eventMode(val) {
    this._eventMode = val
  }
  get eventMode() {
    return this._eventMode
  }

  set selector(val) {
    this._selector = val
    this.parent = document.querySelector(this._selector)
  }
  get selector() {
    return this._selector
  }

  set parent(val) {
    this._parent = val
    this._attachDomElement()
  }
  get parent() {
    return this._parent
  }

  set value(val) {
    if (this._value == val) return
    this._value = clamp(val)
    if (!this._bulkAssign) this.target = this._value
    this.redraw()
  }
  get value() {
    return this._value
  }

  set trackSector(val) {
    if (this._trackSector == val) return
    this._trackSector = val
    this.redraw()
  }
  get trackSector() {
    return this._trackSector
  }

  set target(val) {
    if (this._target == val) return
    this._target = clamp(val)
    this.redraw()
  }
  get target() {
    return this._target
  }

  set keepTarget(val) {
    if (this._keepTarget == val) return
    this._keepTarget = val
  }
  get keepTarget() {
    return this._keepTarget
  }


  set steps(val) {
    if (this._steps == val) return
    this._steps = Math.max(1,val)
    this.redraw()
  }
  get steps() {
    return this._steps
  }

  get step() {
    return Math.round(this._value * (this._steps-1))
  }

  set step(val) {
    this.value = val / this._steps
  }

  get targetStep() {
    return Math.round(this._target * (this._steps-1))
  }

  set targetStep(val) {
    this.target = val / this._steps
  }

  set neutralAngle(val) {
    if (this._neutralAngle == val) return
    this._neutralAngle = val
    this.redraw()
  }
  get neutralAngle() {
    return this._neutralAngle
  }

  set sizeFromParent(val) {
    if (this._sizeFromParent == val) return
    this._sizeFromParent = val
    if (this._sizeFromParent) this.fitParent()
  }
  get sizeFromParent() {
    return this._sizeFromParent
  }

  set width(val) {
    if (this._width == val) return
    this._width = val
    this._resizeCanvas()
  }
  get width() {
    return this._width
  }

  set height(val) {
    if (this._height == val) return
    this._height = val
    this._resizeCanvas()
  }
  get height() {
    return this._height
  }

  set speed(val) {
    if (this._speed == val) return
    this._speed = val
  }
  get speed() {
    return this._speed
  }

  set targetSector(val) {
    if (this._targetSector == val) return
    this._targetSector = val
    this.redraw()
  }
  get targetSector() {
    return this._targetSector
  }

  set valueSector(val) {
    if (this._valueSector == val) return
    this._valueSector = val
    this.redraw()
  }
  get valueSector() {
    return this._valueSector
  }

  set stepGap(val) {
    if (this._stepGap == val) return
    this._stepGap = val
    this.redraw()
  }
  get stepGap() {
    return this._stepGap
  }

  set disabled(val) {
    if (this._disabled == val) return
    this._disabled = val
    if (this._disabled && this._dragging) this.stopDrag()
    if (this._disabled && this._focus) this.blur()
    this.redraw()
  }
  get disabled() {
    return this._disabled
  }

  set observeSize(val) {
    if (this._observeSize == val) return
    this._observeSize = val
    if (this._observeSize) this._loop()
  }
  get observeSize() {
    return observeSize
  }

  set borderRadius(val) {
    if (this._borderRadius == val) return
    this._borderRadius = val
    this.redraw()
  }
  get borderRadius() {
    return this._borderRadius
  }

  set trackSize(val) {
    if (this._trackSize == val) return
    this._trackSize = val
    this.redraw()
  }
  get trackSize() {
    return this._trackSize
  }

  set valueSectorColor(val) {
    if (this._valueSectorColor == val) return
    this._valueSectorColor = val
    this.redraw()
  }
  get valueSectorColor() {
    return this._valueSectorColor
  }

  set trackSectorColor(val) {
    if (this._trackSectorColor == val) return
    this._trackSectorColor = val
    this.redraw()
  }
  get trackSectorColor() {
    return this._trackSectorColor
  }

  set borderColor(val) {
    if (this._borderColor == val) return
    this._borderColor = val
    this.redraw()
  }
  get borderColor() {
    return this._borderColor
  }

  set borderFocusColor(val) {
    if (this._borderFocusColor == val) return
    this._borderFocusColor = val
    this.redraw()
  }
  get borderFocusColor() {
    return this._borderFocusColor
  }

  set backgroundColor(val) {
    if (this._backgroundColor == val) return
    this._backgroundColor = val
    this.redraw()
  }
  get backgroundColor() {
    return this._backgroundColor
  }

  set targetSectorColor(val) {
    if (this._targetSectorColor == val) return
    this._targetSectorColor = val
    this.redraw()
  }
  get targetSectorColor() {
    return this._targetSectorColor
  }

  get domElement() {
    return this._canvas
  }

  fitParent() {
    if (!this._parent) return
    this._width = this._parent.offsetWidth
    this._height =  this._parent.offsetHeight
    this._resizeCanvas()
  }

  redraw() {
    this._redraw = true
    if (!this._bulkAssign) this._loop()
  }

  _resizeCanvas() {
    this._canvasSize = Math.min(this._width, this._height)
    this._radius =  this._canvasSize / 2.
    this._centerX = this._centerY = this._radius
    this.redraw()
  }

  _attachDomElement() {
    if (this.parent && this._canvas) {
      this._parent.appendChild(this._canvas)
      this.fitParent()
      this.redraw()
    }
  }

  _evalMousePosition(e){
    this._mouseX = e.touches ? e.touches[0].pageX : e.pageX
    this._mouseY = e.touches ? e.touches[0].pageY : e.pageY
    this._mouseAngle = calcAngle(
      this._canvas.offsetLeft + this._canvasSize / 2,
      this._canvas.offsetTop + this._canvasSize / 2,
      this._mouseX,
      this._mouseY
    )
    const zero = (this._neutralAngle - Math.PI)
    const inverse = (TAU - (this._trackSector - this._valueSector)) / TAU
    const fullCircle = mod(this._mouseAngle - zero, TAU) / TAU
    const value = fullCircle
      * (TAU / (this._trackSector - this._valueSector))
      - (inverse + this._valueSector / 2) / 2

    this._target = clamp(value)
    this.redraw()
  }

  _dispatchChangeEvent(force) {
    if (
      !force
      && (
        this._eventMode === NONE
        || (this._eventMode === VALUE && this._lastEventValue == this._value)
        || (this._eventMode === TARGET && this._lastEventTarget == this._target)
        || (this._eventMode === STEP && this._lastEventStep == this.step)
        || (this._eventMode === COMPLETE && this._value != this._target)
      )
    ) return
    this._canvas.dispatchEvent(
      new CustomEvent(
        'change',
        {
          bubbles: true,
          detail: {
            step: this.step,
            value: this._value,
            target: this._target,
            component: this
          }
        }
      )
    )
    this._lastEventValue = this._value
    this._lastEventTarget = this._target
    this._lastEventStep = this.step
  }

  _loop() {
    if (
      this._animationFrame
      || (
        !this._observeSize
        && !this._dragging
        && !this._redraw
        && this._value == this._target
      )
    ) return
    this._animationFrame = window.requestAnimationFrame(() => {
      let render = this._dragging || this._redraw
      if (this._value != this._target) {
        if (this.speed && this._value + this._speed <= this._target ) {
          this._value += this._speed
        } else if (this.speed && this._value- this._speed >= this._target ) {
          this._value -= this._speed
        } else {
          this._value = this._target
        }
        render = true
        this._dispatchChangeEvent()
      }
      if (
        this._observeSize
        && this._sizeFromParent
        && (
          this._parent.offsetWidth != this._width
          || this._parent.offsetHeight != this._height
        )
      ) {
        this.fitParent()
        render = true
      }
      this._animationFrame = null
      if (render) this._draw()
      this._loop()
    })
  }

  _draw() {
    const ctx = this._ctx
    const cx = this._centerX
    const cy = this._centerY
    const border = this._borderRadius
    const trackSize = Math.min(this._radius/3, this._trackSize)
    const zero = -this._trackSector/2 + this._neutralAngle
    const limit = zero + this._trackSector
    const delta = calcAngleDelta( zero,limit)
    const target = this._target
    const value = this._value

    const outer = this._radius - border
    const inner = this._radius - border - trackSize

    if (
      ctx.canvas.width != this._canvasSize
      || ctx.canvas.height != this._canvasSize
    ) {
      ctx.canvas.width = ctx.canvas.height = this._canvasSize
    } else {
      ctx.clearRect(0, 0, this._canvasSize, this._canvasSize)
    }



    // background torus
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = this._focus ? this._borderFocusColor : this._borderColor
    ctx.arc(cx, cy, this._radius, 0, TAU)
    ctx.arc(cx, cy, inner - border, 0, TAU, true)
    ctx.clip()
    ctx.fill()
    ctx.restore()

    // torus
    ctx.fillStyle = this._backgroundColor
    drawTorusSegment(ctx, cx, cy, outer, inner)
    ctx.fill()

    let start, end
    if (this._steps < 2) {

      // track
      ctx.fillStyle = this._trackSectorColor
      drawTorusSegment(ctx, cx, cy, outer, inner, zero, limit)
      ctx.fill()

      // target value indicator
      if (value != target) {
        start = target *((TAU + delta - this._targetSector)) + zero
        end = start + this._targetSector
        ctx.fillStyle = this._targetSectorColor
        drawTorusSegment(ctx, cx, cy, outer, inner, start, end)
        ctx.fill()
      }

      // current value indicator
      start = value * (TAU + delta - this._valueSector) + zero
      end = start + this._valueSector
      ctx.fillStyle = this._valueSectorColor
      drawTorusSegment(ctx, cx, cy, outer, inner, start, end)
      ctx.fill()

    } else {

      const segmentSector = this._trackSector / this._steps
      const stepScale = 1 / this._steps
      const step = this.step
      const targetStep = this.targetStep
      // draw segment for every step
      for (let i = 0; i < this._steps; i++) {
        start = mod(zero + segmentSector * i, TAU) + this._stepGap
        end = mod(zero + segmentSector * (i + 1), TAU) - this._stepGap
        // segmented track
        ctx.fillStyle = this._trackSectorColor
        drawTorusSegment(ctx, cx, cy, outer, inner, start, end)
        ctx.fill()
        if (step == i) {
          // segment matches current value
          ctx.fillStyle = this._valueSectorColor
          drawTorusSegment(ctx, cx, cy, outer, inner, start, end)
          ctx.fill()
        } else if (value != target && targetStep == i) {
          //if (target >= i * stepScale && target <= (i + 1) * stepScale) {
            // current value neq target value segement matches selected step
            ctx.fillStyle = this._targetSectorColor
            drawTorusSegment(ctx, cx, cy, outer, inner, start, end)
            ctx.fill()
        //  }
        }
      }
    }
    this._redraw = false
  }
}
