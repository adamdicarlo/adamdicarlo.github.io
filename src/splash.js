import { colord, random } from "colord"

const canvas = document.createElement("canvas")
let width, height
let about = {
  el: undefined,
  width: undefined,
  height: undefined,
}

document.addEventListener("DOMContentLoaded", () => {
  canvas.style.position = "fixed"
  canvas.style.left = 0
  canvas.style.top = 0
  resizeCanvas()
  document.body.appendChild(canvas)

  window.addEventListener("resize", () => {
    resizeCanvas()
  })
  window.requestAnimationFrame(render)
  scheduleEvents()
})

function resizeCanvas() {
  canvas.width = width = window.innerWidth
  canvas.height = height = window.innerHeight
}

function scheduleEvents() {
  setTimeout(() => {
    about.el = document.querySelector("#about")
    about.el.classList.remove("hide")
    about.el.classList.add("show")
  }, 2000)

  setTimeout(() => {
    const button = document.querySelector("#randomize")
    button.classList.remove("hide")
    button.classList.add("show")
    button.addEventListener("click", randomize)
  }, 7000)
}

const minFramesBetweenReverse = 500
const toRadians = Math.PI / 180
let colors_ = [
  colord("#025bb7"),
  colord("#9e144a"),
  colord("#88e301"),
  colord("#ffd53c"),
]
let colors2_ = [
  colord("#9e144a"),
  colord("#aef58c"),
  colord("#68e7f1"),
  colord("#013ba7"),
]
let frameIncrement = 1
let framesSinceReverse = 0
let frame = 0
let theta = 0.25

function randomize() {
  colors_ = Array(colors_.length)
    .fill(undefined)
    .map(() => random())

  colors2_ = Array(colors2_.length)
    .fill(undefined)
    .map(() => random())

  frameIncrement = Math.random() > 0.5 ? 1 : -1
  theta = Math.random()
}

function render() {
  const context = canvas.getContext("2d")

  const angle = frame * theta
  renderGradient(context, 45 + Math.cos(frame * toRadians), colors_, 1.0)
  renderGradient(context, angle, colors2_, 0.5)

  frame += frameIncrement
  framesSinceReverse++

  if (framesSinceReverse > minFramesBetweenReverse && Math.random() < 0.001) {
    framesSinceReverse = 0
    frameIncrement = -frameIncrement
  }

  window.requestAnimationFrame(render)
}

function renderGradient(context, angle, colors, alpha) {
  const radians = angle * toRadians

  const cos = Math.cos(radians)
  const sin = Math.sin(radians)
  const halfWidth = width / 2
  const halfHeight = height / 2
  const xRotated = cos * halfWidth
  const yRotated = sin * halfHeight
  const gradient = context.createLinearGradient(
    -xRotated + halfWidth,
    -yRotated + halfHeight,
    xRotated + halfWidth,
    yRotated + halfHeight
  )

  gradient.addColorStop(0, colors[0].rotate(angle).alpha(alpha).toHex())
  gradient.addColorStop(
    0.3,
    colors[1]
      .rotate(angle + 90)
      .alpha(alpha)
      .toHex()
  )
  gradient.addColorStop(
    0.7,
    colors[3]
      .rotate(angle - 90)
      .alpha(alpha)
      .toHex()
  )
  gradient.addColorStop(1.0, colors[3].rotate(-angle).alpha(alpha).toHex())
  context.fillStyle = gradient
  context.fillRect(0, 0, width, height)
}
