import 'https://cdn.plot.ly/plotly-2.8.3.min.js'

const cont = document.getElementById('content')

cont.addEventListener('click', e => plot(e.layerX, e.layerY, e))
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
    // title: 'Rectangles Positioned Relative to the Plot and to the Axes',
    xaxis: {
        range: [0, 4]
    },
    yaxis: {
        range: [0, 4]
    },
    // hovermode:false,
    width: cont.clientWidth,
    height: cont.clientHeight,
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
        Plotly.newPlot(cont, [trace], layout)
        // console.log('newPlot')
    } else {
        let [x1, y1] = getPoint(x, y)
        xx.push(x1)
        yy.push(y1)
        colors.push(e.altKey? 255: 2)
        // console.log(e)
        Plotly.update(cont, [trace], layout)
        // console.log('update')
    }
}

plot()
