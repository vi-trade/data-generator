export function getHtml(width, height) {

return `
<style>

.content {
    border: 0px solid silver;
    width: ${width}px;
    height:${height}px;
    left: 0;    
    top: 0;
    background-color: whitesmoke;
    position: absolute;
}

.cover {
    border: 0px solid red;
    z-index: 100;
    background-color: transparent;
    touch-action: none;
}
.buttons {
    position:absolute;
    z-index: 200;
    left: 0;
    top:0;
    font-family: sans-serif;
    border-bottom: 1px solid silver; 
    padding-bottom:10px;
    
}
#controls {
    display: none;
    background-color: transparent;
}
</style>


<div id="content" class="content"></div>
<div id="cover" class="content cover" style="display: none;"></div>

<div id="buttons" class="buttons">
    <button id="btnPass" title="calls passData() of Colab" style="cursor: pointer;">⇪</button>
    draw <input id="chk" type="checkbox" title="draw data points">
    <span id="controls">
        color <input id="inpColor" type="number" min="0" max="7" value="1" title="color">
        points <input id="inpNumber" type="number" min="1" max="1000" value="5" title="number of points">
        σ <input id="inpSigma" type="range" min="0.0" max="0.3" step="0.01" value="0.05" style="width:100px; vertical-align: middle;" title="sigma" list="steplist0">
        <datalist id="steplist">
            <option>0.0</option>
            <option>0.05</option>
            <option>0.1</option>
            <option>0.15</option>
            <option>0.2</option>
            <option>0.25</option>
            <option>0.3</option>
        </datalist>
        erase <input id="chkErase" type="checkbox" title="erase points">
        v006
    </span>

</div>
`
}