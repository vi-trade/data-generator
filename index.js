import 'https://cdn.plot.ly/plotly-2.8.3.min.js'

const content = document.getElementById('content')
const cover = document.getElementById('cover')
const chk = document.getElementById('chk')

chk.addEventListener('change', onChkChange)
// content.addEventListener('mousedown', onMouseDown)
cover.addEventListener('mousedown', onMouseDown)

function onChkChange(e) {
    e.preventDefault()
    cover.style.display= this.checked? 'block': 'none'
}


function onMouseDown(e) {
    e.preventDefault()
    let rect = e.target.getBoundingClientRect()
    let offsetX = rect.left
    let offsetY = rect.top
    // console.log("X: " + offsetX, "Y: " + offsetY)
    plot(e.layerX, e.layerY, e)
}

let xx = []
let yy = []
let colors =[]

let trace = {
    x: xx,
    y: yy,
    type: 'scatter',
    mode: 'markers',
    marker: { size: 4, colorscale: 'Bluered', color: colors }
}

let layout = {
    title: 'Touch events',
    xaxis: {
        range: [0, 4]
    },
    yaxis: {
        range: [0, 4]
    },
    // hovermode:false,
    width: content.clientWidth,
    height: content.clientHeight,
    margin: { l: 50, r: 50, t: 50, b: 50 }
}

function getPoint (x, y) {
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

function plot (x = undefined, y = undefined, e=undefined) {
    if (x === undefined || y === undefined || e === undefined) {
        Plotly.newPlot(content, [trace], layout)
        // console.log('newPlot')
    } else {
        let [x1, y1] = getPoint(x, y)
        // console.log(`x1=${x1}, y1=${y1}`)
        xx.push(x1)
        yy.push(y1)
        colors.push(e.altKey? 255: 2)
        // console.log(e)
        Plotly.update(content, [trace], layout)
        // console.log('update')
    }
}

plot()
