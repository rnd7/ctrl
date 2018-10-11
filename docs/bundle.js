/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../ctrl/index.js":
/*!************************!*\
  !*** ../ctrl/index.js ***!
  \************************/
/*! exports provided: Rotary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rotary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rotary */ \"../ctrl/rotary.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Rotary\", function() { return _rotary__WEBPACK_IMPORTED_MODULE_0__[\"Rotary\"]; });\n\n\n//console.log(components)\n\n\n\n//# sourceURL=webpack:///../ctrl/index.js?");

/***/ }),

/***/ "../ctrl/rotary.js":
/*!*************************!*\
  !*** ../ctrl/rotary.js ***!
  \*************************/
/*! exports provided: ROTARY_DEFAULTS, Rotary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ROTARY_DEFAULTS\", function() { return ROTARY_DEFAULTS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Rotary\", function() { return Rotary; });\n\nconst TAU = Math.PI * 2\nconst HALF_PI = Math.PI / 2\n\nfunction mod( a, n ) { return ( a % n + n ) % n }\n\nfunction calcAngle(ax, ay, bx, by) {\n  var angle = Math.atan2(by - ay, bx - ax)\n  if ( angle < 0 ) angle += TAU\n  return angle\n}\n\nfunction calcAngleDelta( current, target ) {\n  var a = mod( ( current - target ), TAU )\n  var b = mod( ( target - current ), TAU)\n  return a < b ? -a : b\n}\n\nfunction clamp(val, min, max) {\n  return Math.min(max || 1, Math.max(min || 0, val))\n}\n\nfunction drawTorusSegment(ctx, x, y, outer, inner, start, end) {\n  start = start || 0\n  end = end || TAU\n  ctx.beginPath()\n  ctx.arc(x, y, outer, start , end, false)\n  ctx.arc(x, y, inner, end, start, true)\n  ctx.closePath()\n}\n\nconst ROTARY_DEFAULTS = {\n  observeSize: false, // poll for parent size changes\n  sizeFromParent: true, // fit within parent bounds\n  speed: .01, // value per frame\n  value: 0., // 0-1\n  disabled: false, // non interactive\n  neutralAngle: -HALF_PI, // track orientation\n  borderRadius: 2,\n  borderColor: 'rgb(12,12,12)',\n  borderFocusColor: 'rgb(0,0,80)',\n  backgroundColor: 'rgb(36,36,36)',\n  steps: 0, // 2-n to specify steps\n  stepGap: TAU / 360, // stepper only. gap between segments\n  trackSize: 12, // width of the track\n  trackSector: TAU * .8, // track span as circular sector\n  trackSectorColor: 'rgb(66,66,66)',\n  mouseSector: TAU / 12, // size of mouse indicator\n  mouseSectorColor: 'rgba(170,170,255,.5)',\n  valueSector: TAU / 48, // size of value indicator\n  valueSectorColor: 'rgb(255,255,255)',\n  targetSector: TAU / 48, // size of target indicator\n  targetSectorColor: 'rgba(170,170,255,.5)',\n}\n\nclass Rotary {\n  constructor(opts) {\n    this._canvas = document.createElement('CANVAS')\n    this._canvas.tabIndex = 0\n    this._canvas.style.outline = 0\n    this._canvas.style.userSelect = \"none\"\n    this._ctx = this._canvas.getContext(\"2d\")\n    this._target = null\n    this._mouseX = 0.\n    this._mouseY = 0.\n    this._mouseAngle = 0.\n    this._bound = {\n      startDrag: this.startDrag.bind(this),\n      stopDrag: this.stopDrag.bind(this),\n      drag: this.drag.bind(this),\n      focus: this.focus.bind(this),\n      blur: this.blur.bind(this)\n    }\n\n    Object.assign(this, ROTARY_DEFAULTS, opts)\n\n    if (this.target === null) this.target = this.value // if no target use value\n\n    this._canvas.addEventListener(\"mousedown\", this._bound.startDrag)\n    this._canvas.addEventListener(\"focus\", this._bound.focus, true)\n    this._canvas.addEventListener(\"blur\", this._bound.blur, true)\n  }\n\n  startDrag(e) {\n    if (this._disabled) return\n    this._dragging = true\n    this._canvas.removeEventListener(\"mousedown\", this._bound.startDrag)\n    this._canvas.removeEventListener(\"touchstart\", this._bound.startDrag)\n    document.addEventListener(\"mousemove\", this._bound.drag)\n    document.addEventListener(\"touchmove\", this._bound.drag)\n    document.addEventListener(\"mouseup\", this._bound.stopDrag)\n    document.addEventListener(\"mouseleave\", this._bound.stopDrag)\n    document.addEventListener(\"dragleave\", this._bound.stopDrag)\n    document.addEventListener(\"touchcancel\", this._bound.stopDrag)\n    document.addEventListener(\"touchend\", this._bound.stopDrag)\n    this._evalMousePosition(e)\n  }\n\n  drag(e) {\n    if (this._disabled) return\n    this._evalMousePosition(e)\n  }\n\n  stopDrag(e) {\n    if (this._disabled) return\n    this._dragging = false\n    document.removeEventListener(\"mousemove\", this._bound.drag)\n    document.removeEventListener(\"touchmove\", this._bound.drag)\n    document.removeEventListener(\"mouseup\", this._bound.stopDrag)\n    document.removeEventListener(\"mouseleave\", this._bound.stopDrag)\n    document.removeEventListener(\"dragleave\", this._bound.stopDrag)\n    document.removeEventListener(\"touchcancel\", this._bound.stopDrag)\n    document.removeEventListener(\"touchend\", this._bound.stopDrag)\n    this._canvas.addEventListener(\"mousedown\", this._bound.startDrag)\n    this._canvas.addEventListener(\"touchstart\", this._bound.startDrag)\n    this._evalMousePosition(e)\n  }\n\n  focus(e) {\n    if (this._disabled) return\n    this._focus = true\n    this.redraw()\n  }\n\n  blur(e) {\n    if (this._disabled) return\n    this._focus = false\n    this.redraw()\n  }\n\n  on(...args) {\n    this._canvas.addEventListener.apply(this._canvas, args)\n  }\n\n  addEventListener(...args) {\n    this._canvas.addEventListener.apply(this._canvas, args)\n  }\n\n  off(...args) {\n    this._canvas.removeEventListener.apply(this._canvas, args)\n  }\n\n  removeEventListener(...args) {\n    this._canvas.removeEventListener.apply(this._canvas, args)\n  }\n\n  set selector(val) {\n    this._selector = val\n    this.parent = document.querySelector(this._selector)\n  }\n  get selector() {\n    return this._selector\n  }\n\n  set parent(val) {\n    this._parent = val\n    this._attachDomElement()\n  }\n  get parent() {\n    return this._parent\n  }\n\n  set value(val) {\n    if (this._value == val) return\n    this._value = clamp(val)\n    this.redraw()\n  }\n  get value() {\n    return this._value\n  }\n\n  set trackSector(val) {\n    if (this._trackSector == val) return\n    this._trackSector = val\n    this.redraw()\n  }\n  get trackSector() {\n    return this._trackSector\n  }\n\n  set target(val) {\n    if (this._target == val) return\n    this._target = clamp(val)\n    this.redraw()\n  }\n  get target() {\n    return this._target\n  }\n\n  set steps(val) {\n    if (this._steps == val) return\n    this._steps = val\n    this.redraw()\n  }\n  get steps() {\n    return this._steps\n  }\n\n  set neutralAngle(val) {\n    if (this._neutralAngle == val) return\n    this._neutralAngle = val\n    this.redraw()\n  }\n  get neutralAngle() {\n    return this._neutralAngle\n  }\n\n  set sizeFromParent(val) {\n    if (this._sizeFromParent == val) return\n    this._sizeFromParent = val\n    if (this._sizeFromParent) this.fitParent()\n  }\n  get sizeFromParent() {\n    return this._sizeFromParent\n  }\n\n  set width(val) {\n    if (this._width == val) return\n    this._width = val\n    this._resizeCanvas()\n  }\n  get width() {\n    return this._width\n  }\n\n  set height(val) {\n    if (this._height == val) return\n    this._height = val\n    this._resizeCanvas()\n  }\n  get height() {\n    return this._height\n  }\n\n  set speed(val) {\n    if (this._speed == val) return\n    this._speed = val\n  }\n  get speed() {\n    return this._speed\n  }\n\n  set mouseSector(val) {\n    if (this._mouseSector == val) return\n    this._mouseSector = val\n    this.redraw()\n  }\n  get mouseSector() {\n    return this._mouseSector\n  }\n\n  set targetSector(val) {\n    if (this._targetSector == val) return\n    this._targetSector = val\n    this.redraw()\n  }\n  get targetSector() {\n    return this._targetSector\n  }\n\n  set valueSector(val) {\n    if (this._valueSector == val) return\n    this._valueSector = val\n    this.redraw()\n  }\n  get valueSector() {\n    return this._valueSector\n  }\n\n  set stepGap(val) {\n    if (this._stepGap == val) return\n    this._stepGap = val\n    this.redraw()\n  }\n  get stepGap() {\n    return this._stepGap\n  }\n\n  set disabled(val) {\n    if (this._disabled == val) return\n    this._disabled = val\n    if (this._disabled && this._dragging) this.stopDrag()\n    if (this._disabled && this._focus) this.blur()\n    this.redraw()\n  }\n  get disabled() {\n    return this._disabled\n  }\n\n  set observeSize(val) {\n    if (this._observeSize == val) return\n    this._observeSize = val\n    if (this._observeSize) this._loop()\n  }\n  get observeSize() {\n    return observeSize\n  }\n\n  set borderRadius(val) {\n    if (this._borderRadius == val) return\n    this._borderRadius = val\n    this.redraw()\n  }\n  get borderRadius() {\n    return this._borderRadius\n  }\n\n  set trackSize(val) {\n    if (this._trackSize == val) return\n    this._trackSize = val\n    this.redraw()\n  }\n  get trackSize() {\n    return this._trackSize\n  }\n\n  set valueSectorColor(val) {\n    if (this._valueSectorColor == val) return\n    this._valueSectorColor = val\n    this.redraw()\n  }\n  get valueSectorColor() {\n    return this._valueSectorColor\n  }\n\n  set trackSectorColor(val) {\n    if (this._trackSectorColor == val) return\n    this._trackSectorColor = val\n    this.redraw()\n  }\n  get trackSectorColor() {\n    return this._trackSectorColor\n  }\n\n  set mouseSectorColor(val) {\n    if (this._mouseSectorColor == val) return\n    this._mouseSectorColor = val\n    this.redraw()\n  }\n  get mouseSectorColor() {\n    return this._mouseSectorColor\n  }\n\n  set borderColor(val) {\n    if (this._borderColor == val) return\n    this._borderColor = val\n    this.redraw()\n  }\n  get borderColor() {\n    return this._borderColor\n  }\n\n  set borderFocusColor(val) {\n    if (this._borderFocusColor == val) return\n    this._borderFocusColor = val\n    this.redraw()\n  }\n  get borderFocusColor() {\n    return this._borderFocusColor\n  }\n\n  set backgroundColor(val) {\n    if (this._backgroundColor == val) return\n    this._backgroundColor = val\n    this.redraw()\n  }\n  get backgroundColor() {\n    return this._backgroundColor\n  }\n\n  set targetSectorColor(val) {\n    if (this._targetSectorColor == val) return\n    this._targetSectorColor = val\n    this.redraw()\n  }\n  get targetSectorColor() {\n    return this._targetSectorColor\n  }\n\n  get domElement() {\n    return this._canvas\n  }\n\n  fitParent() {\n    if (!this._parent) return\n    this._width = this._parent.offsetWidth\n    this._height =  this._parent.offsetHeight\n    this._resizeCanvas()\n  }\n\n  redraw() {\n    this._redraw = true\n    this._loop()\n  }\n\n  _resizeCanvas() {\n    this._canvasSize = Math.min(this._width, this._height)\n    this._radius =  this._canvasSize / 2.\n    this._centerX = this._centerY = this._radius\n    this.redraw()\n  }\n\n  _attachDomElement() {\n    if (this.parent && this._canvas) {\n      this._parent.appendChild(this._canvas)\n      this.fitParent()\n      this.redraw()\n    }\n  }\n\n  _evalMousePosition(e){\n    this._mouseX = e.touches ? e.touches[0].pageX : e.pageX\n    this._mouseY = e.touches ? e.touches[0].pageY : e.pageY\n    this._mouseAngle = calcAngle(\n      this._canvas.offsetLeft + this._canvasSize / 2,\n      this._canvas.offsetTop + this._canvasSize / 2,\n      this._mouseX,\n      this._mouseY\n    )\n    const zero = (this._neutralAngle - Math.PI)\n    const inverse = (TAU - (this._trackSector - this._valueSector)) / TAU\n    const fullCircle = mod(this._mouseAngle - zero, TAU) / TAU\n    const value = fullCircle\n      * (TAU / (this._trackSector - this._valueSector))\n      - (inverse + this._valueSector / 2) / 2\n\n    this._target = clamp(value)\n    this.redraw()\n  }\n\n  _dispatchChangeEvent() {\n    this._canvas.dispatchEvent(\n      new CustomEvent(\n        'change',\n        {\n          bubbles: true,\n          detail: {\n            value: this._value,\n            component: this\n          }\n        }\n      )\n    )\n  }\n\n  _loop() {\n    if (\n      this._animationFrame\n      || (\n        !this._observeSize\n        && !this._dragging\n        && !this._redraw\n        && this._value == this._target\n      )\n    ) return\n    this._animationFrame = window.requestAnimationFrame(() => {\n      let render = this._dragging || this._redraw\n      if (this._value != this._target) {\n        if (this.speed <= 0) {\n          // speed lte 0 just set value\n          this._value = this._target\n        } else {\n          if (this._value + this._speed <= this._target ) {\n            this._value += this._speed\n          } else if (this._value- this._speed >= this._target ) {\n            this._value -= this._speed\n          } else {\n            this._value = this._target\n          }\n        }\n        render = true\n        this._dispatchChangeEvent()\n      }\n      if (\n        this._observeSize\n        && this._sizeFromParent\n        && (\n          this._parent.offsetWidth != this._width\n          || this._parent.offsetHeight != this._height\n        )\n      ) {\n        this.fitParent()\n        render = true\n      }\n      this._animationFrame = null\n      if (render) this._draw()\n      this._loop()\n    })\n  }\n\n  _draw() {\n    const ctx = this._ctx\n    const cx = this._centerX\n    const cy = this._centerY\n    const border = this._borderRadius\n    const trackSize = Math.min(this._radius/3, this._trackSize)\n    const zero = -this._trackSector/2 + this._neutralAngle\n    const limit = zero + this._trackSector\n    const delta = calcAngleDelta( zero,limit)\n    const target = this._target\n    const value = this._value\n\n    const outer = this._radius - border\n    const inner = this._radius - border - trackSize\n\n    if (\n      ctx.canvas.width != this._canvasSize\n      || ctx.canvas.height != this._canvasSize\n    ) {\n      ctx.canvas.width = ctx.canvas.height = this._canvasSize\n    } else {\n      ctx.clearRect(0, 0, this._canvasSize, this._canvasSize)\n    }\n\n\n\n    // background torus\n    ctx.save()\n    ctx.beginPath()\n    ctx.fillStyle = this._focus ? this._borderFocusColor : this._borderColor\n    ctx.arc(cx, cy, this._radius, 0, TAU)\n    ctx.arc(cx, cy, inner - border, 0, TAU, true)\n    ctx.clip()\n    ctx.fill()\n    ctx.restore()\n\n    // torus\n    ctx.fillStyle = this._backgroundColor\n    drawTorusSegment(ctx, cx, cy, outer, inner)\n    ctx.fill()\n\n    let start, end\n    if (this._steps < 2) {\n\n      // track\n      ctx.fillStyle = this._trackSectorColor\n      drawTorusSegment(ctx, cx, cy, outer, inner, zero, limit)\n      ctx.fill()\n\n      // target value indicator\n      if (value != target) {\n        start = target *((TAU + delta - this._targetSector)) + zero\n        end = start + this._targetSector\n        ctx.fillStyle = this._targetSectorColor\n        drawTorusSegment(ctx, cx, cy, outer, inner, start, end)\n        ctx.fill()\n      }\n\n      // current value indicator\n      start = value * (TAU + delta - this._valueSector) + zero\n      end = start + this._valueSector\n      ctx.fillStyle = this._valueSectorColor\n      drawTorusSegment(ctx, cx, cy, outer, inner, start, end)\n      ctx.fill()\n\n    } else {\n\n      const segmentSector = this._trackSector / this._steps\n      const stepScale = 1 / this._steps\n\n      // draw segment for every step\n      for (let i = 0; i < this._steps; i++) {\n        start = mod(zero + segmentSector * i, TAU) + this._stepGap\n        end = mod(zero + segmentSector * (i + 1), TAU) - this._stepGap\n        // segmented track\n        ctx.fillStyle = this._trackSectorColor\n        drawTorusSegment(ctx, cx, cy, outer, inner, start, end)\n        ctx.fill()\n        if (value >= i * stepScale && value <= (i + 1) * stepScale) {\n          // segment matches current value\n          ctx.fillStyle = this._valueSectorColor\n          drawTorusSegment(ctx, cx, cy, outer, inner, start, end)\n          ctx.fill()\n        } else if (value != target) {\n          if (target >= i * stepScale && target <= (i + 1) * stepScale) {\n            // current value neq target value segement matches selected step\n            ctx.fillStyle = this._targetSectorColor\n            drawTorusSegment(ctx, cx, cy, outer, inner, start, end)\n            ctx.fill()\n          }\n        }\n      }\n    }\n    if (this._dragging) {\n      // show mouse angle while dragging\n      start = this._mouseAngle - this._mouseSector / 2\n      end = this._mouseAngle + this._mouseSector / 2\n      ctx.fillStyle = this._mouseSectorColor\n      drawTorusSegment(ctx, cx, cy, outer, inner, start, end)\n      ctx.fill()\n    }\n    this._redraw = false\n  }\n}\n\n\n//# sourceURL=webpack:///../ctrl/rotary.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ctrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ctrl */ \"../ctrl/index.js\");\n  // aka '@rnd7/ctrl'\n\nwindow.addEventListener(\"load\", e => {\n  new _ctrl__WEBPACK_IMPORTED_MODULE_0__[\"Rotary\"]({selector:'#rotary', value:1.0,  observeSize: true}).on(\"change\", e => {console.log(e.detail.value)})\n  var rot = new _ctrl__WEBPACK_IMPORTED_MODULE_0__[\"Rotary\"]({parent: document.querySelector('#rotary-stepper'), value:1.0, steps:12})\n  Object.assign(rot, {target: 0})\n})\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });