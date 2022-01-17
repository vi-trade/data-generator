import 'https://cdn.plot.ly/plotly-2.8.3.min.js'
import { randomNormal } from 'https://cdn.skypack.dev/d3-random@3'
import { getHtml } from './ui.js'

let data_callback_name = ""
let content = null
let cover = null
let controls = null
let btnPass = null
let chk = null
let inpColor = null
let inpNumber = null
let inpSigma = null
let chkErase = null

let mouseUp = true

let xx = []
let yy = []
let cc = []

function getTrace () {
  return {
    "x": xx,
    "y": yy,
    // "type": "scatter",
    "type": "scattergl",
    "mode": "markers",
    "marker": { "size": 3, "colorscale": "Jet", "cmin": 0, "cmid": 3, "cmax": 7, "color": cc }
  }
}

function getLayout (max_X, max_Y) {
  let layout = {
    "template": "none",
    "title": "",
    "xaxis": { "range": [0, max_X] }, 
    "yaxis": { "range": [0, max_Y] },
    hovermode:false,
    "width": content.clientWidth,
    "height": content.clientHeight,
    "margin": { "l": 50, "r": 50, "t": 50, "b": 50 },
    annotations: [
      {
        "text": xx.length + " points",
        "showarrow": false,
        "yref": "paper",
        "xref": "paper",
        "x":1,
        "y":1,
      }],    
  }
  // do not break x an y ranges
  if (max_X === undefined || max_Y === undefined){
    layout.xaxis.range = content.layout.xaxis.range
    layout.yaxis.range = content.layout.yaxis.range
  }
  return layout
}

function onChkChange (e) {
  e.preventDefault()
  cover.style.display = this.checked ? 'block' : 'none'
  controls.style.display = this.checked ? 'inline' : 'none'
}

function onMouseDown (e) {
  e.preventDefault()
  mouseUp = false
  addOrDeletePointData(e)
  plotRedraw()
}

let redrawTimeout = 0
function onMouseMove (e) {
  e.preventDefault()
  if (mouseUp) return false
  addOrDeletePointData(e)
  clearTimeout(redrawTimeout)
  redrawTimeout = setTimeout(plotRedraw, 10)
}

function onMouseUp (e) {
  e.preventDefault()
  mouseUp = true
}

function getPointCoords (x, y) {
  let c = document.getElementById('content')
  let w = c.layout.width
  let h = c.layout.height
  let l = c.layout.margin.l
  let t = c.layout.margin.t
  let b = c.layout.margin.b
  let r = c.layout.margin.r
  let [xmin, xmax] = c.layout.xaxis.range
  let [ymin, ymax] = c.layout.yaxis.range
  let x1 = xmin + ((xmax - xmin) * (x - l)) / (w - l - r)
  let y1 = ymin + ((ymax - ymin) * (h - b - y)) / (h - b - t)
  return [x1, y1]
}

// function getPointColor(e){
//     return 0 + (e.altKey?1:0) + (e.shiftKey?2:0) + (e.ctrlKey?4:0)
// }

function erasePointData (e) {
  let [x, y] = getPointCoords(e.offsetX, e.offsetY)
  let sigma = parseFloat(inpSigma.value)
  let xx1 = [],
    yy1 = [],
    cc1 = []
  for (let i = 0; i < xx.length; i++) {
    let xi = xx[i],
      yi = yy[i],
      ci = cc[i]
    let d2 = (x - xi) * (x - xi) + (y - yi) * (y - yi)
    if (d2 > sigma * sigma) {
      xx1.push(xi)
      yy1.push(yi)
      cc1.push(ci)
    }
  }
  xx = xx1
  yy = yy1
  cc = cc1
}

function addPointData (e) {
  let [x, y] = getPointCoords(e.offsetX, e.offsetY)
  let c = parseInt(inpColor.value)
  let num = parseInt(inpNumber.value)
  let sigma = parseFloat(inpSigma.value)
  let rx = getRandomNormal(num, x, sigma)
  let ry = getRandomNormal(num, y, sigma)
  let rc = new Array(num).fill(c)
  xx.push(...rx)
  yy.push(...ry)
  cc.push(...rc)
}

function addOrDeletePointData (e) {
  if (!e) {
    return
  }
  if (chkErase.checked) {
    erasePointData(e)
  } else {
    addPointData(e)
  }
}

function getRandomNormal (num, mu = 0, sigma = 0.05) {
  let arr = []
  let rand = randomNormal(mu, sigma)
  for (let index = 0; index < num; index++) {
    arr.push(rand())
  }
  return arr
}

function passData (e) {
  // let data = { xx: xx, yy: yy, cc: cc }
  let data = { data:getTrace(), layout: getLayout() }

  try {
    if (data_callback_name)
      google.colab.kernel.invokeFunction('notebook.'+data_callback_name, [data], {})
  } catch (error) {
    console.log('ERR:passData:', error)
  }
}


function plotRedraw () {
  if (chkErase.checked) {
    Plotly.react(content, [getTrace()], getLayout())
  } else {
    Plotly.update(content, [getTrace()], getLayout())
  }
}

/**
 * Creates user interface to enter points
 * @param {string} containerId - id of a container
 * @param {*} position - relative or absolute
 */
function DataGenerator(callback_name, containerId,  max_X=1.0, max_Y=1.0, width=500, height=500, position = 'relative') {
  data_callback_name = callback_name
  let container = document.getElementById(containerId)
  container.style.position = position
  container.innerHTML = getHtml(width, height)
  content = document.getElementById('content')
  cover = document.getElementById('cover')
  controls = document.getElementById('controls')
  btnPass = document.getElementById('btnPass')
  chk = document.getElementById('chk')
  inpColor = document.getElementById('inpColor')
  inpNumber = document.getElementById('inpNumber')
  inpSigma = document.getElementById('inpSigma')
  chkErase = document.getElementById('chkErase')

  btnPass.addEventListener('click', passData)
  chk.addEventListener('change', onChkChange)
  cover.addEventListener('mouseup', onMouseUp)
  cover.addEventListener('mousedown', onMouseDown)
  cover.addEventListener('mousemove', onMouseMove)
  cover.addEventListener('contextmenu', e => e.preventDefault())

  
  Plotly.newPlot(content, [getTrace()], getLayout(max_X, max_Y))
}

export { xx, yy, cc, DataGenerator, getLayout, getTrace}
