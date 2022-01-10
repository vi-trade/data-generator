import 'https://cdn.plot.ly/plotly-2.8.3.min.js'
import {html} from './containers.js'

let content = null
let cover = null
let chk = null
let btnPass = null

let xx = window.xx=[]
let yy = window.yy=[]
let cc = window.cc=[]

let trace = {
    x: xx,
    y: yy,
    type: 'scatter',
    mode: 'markers',
    marker: { size: 4, colorscale: 'Jet', cmin:0, cmid:3, cmax:7, color: cc }
}

let layout = {
    title: 'Tch events',
    xaxis: {
        range: [0, 4]
    },
    yaxis: {
        range: [0, 4]
    },
    // hovermode:false,
    // width: content.clientWidth,
    // height: content.clientHeight,
    margin: { l: 50, r: 50, t: 50, b: 50 }
}





function onChkChange(e) {
    e.preventDefault()
    cover.style.display= this.checked? 'block': 'none'
}


function onMouseDown(e) {
    e.preventDefault()
    addPointData(e)
    plotUpdate()
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

function getPointColor(e){
    return 0 + (e.altKey?1:0) + (e.shiftKey?2:0) + (e.ctrlKey?4:0) 
}

function addPointData(e) {
    if (!e) {
        return
    } 
    let [x, y] = getPointCoords(e.layerX, e.layerY)
    let c = getPointColor(e)
    xx.push(x)
    yy.push(y)
    cc.push(c)
}

function passData(e){
    let data = {xx:xx, yy:yy, cc:cc}
    try {
        google.colab.kernel.invokeFunction( 'notebook.passData', [data], {} )
    } catch (error) {
        console.log("ERR:passData:",error)    
    }
}


function plotUpdate() {
    Plotly.update(content, [trace], layout)
}

/**
 * Creates user interface to enter points
 * @param {string} containerId - id of a container
 * @param {*} position - relative or absolute
 */
function createUI(containerId, position='relative'){
    let container = document.getElementById(containerId)
    container.style.position=position
    container.innerHTML= html
    content = document.getElementById('content')
    cover = document.getElementById('cover')
    chk = document.getElementById('chk')
    btnPass = document.getElementById('btnPass')

    btnPass.addEventListener('click', passData)
    chk.addEventListener('change', onChkChange)
    cover.addEventListener('mousedown', onMouseDown)
    cover.addEventListener('contextmenu', e => e.preventDefault())

    layout.width = content.clientWidth
    layout.height = content.clientHeight
    Plotly.newPlot(content, [trace], layout)

}


export {xx,yy,cc,createUI}