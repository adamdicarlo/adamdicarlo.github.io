import domready from 'domready'
import raf from 'raf'
import {ColorFactory} from 'colorfactory'
import 'normalize.css/normalize.css'
import './splash.css'

const canvas = document.createElement('canvas')
let width, height
let about = {
  el: undefined,
  width: undefined,
  height: undefined
}

domready(() => {
  canvas.style.position = 'fixed'
  canvas.style.left = 0
  canvas.style.top = 0
  resizeCanvas()
  document.body.appendChild(canvas)

  window.addEventListener('resize', () => {
    resizeCanvas()
  })
  raf(render)
  scheduleEvents()
})

function resizeCanvas () {
  canvas.width = width = window.innerWidth
  canvas.height = height = window.innerHeight
}

const twoPi = Math.PI * 2.0
const numColors = 720
const theta = twoPi / 720.0
const startColors = ColorFactory.interpolate('#05FA8C', '#E73B57', numColors)
const endColors = ColorFactory.interpolate('#E73B57', '#05FA8C', numColors)
let color = 0
let angle = 0.0
let direction = 1

function scheduleEvents () {
  setTimeout(() => {
    about.el = document.querySelector('#about')
    about.el.classList = ['show']
  }, 2000)
}

function render () {
  const context = canvas.getContext('2d')
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const gradient = context.createLinearGradient(0, 0, cos * width, sin * height)

  gradient.addColorStop(0, startColors[color])
  gradient.addColorStop(1, endColors[color])
  context.fillStyle = gradient
  context.fillRect(0, 0, width, height)

  angle = angle + theta
  if (angle > twoPi) {
    angle -= twoPi
  }

  color += direction
  if (color < 0 || color >= numColors) {
    color = Math.max(Math.min(color, numColors - 1), 0)
    direction = -direction
  }

  raf(render)
}
