export let html = `
<style>

.content {
    border: 0px solid silver;
    width: 600px;
    height:500px;
    left: 0;    
    top: 0;
    background-color: whitesmoke;
    position: absolute;
}

.cover {
    border: 0px solid red;
    z-index: 100;
    background-color: transparent;
}
.buttons {
    position:absolute;
    z-index: 200;
    left: 0;
    top:0;
}
</style>


<div id="content" class="content"></div>
<div id="cover" class="content cover" style="display: none;"></div>

<div id="buttons" class="buttons">
    <input id="chk" type="checkbox" title="draw data points">
    <span id="controls" style="display: none;">
        <input id="inpColor" type="number" min="0" max="7" value="1" title="color">
        <input id="inpNumber" type="number" min="1" max="1000" value="20" title="number of points">
        <input id="inpSigma" type="range" min="0.0" max="0.2" step="0.01" value="0.05" style="width:60px;" title="sigma">
        <input id="chkErase" type="checkbox" title="erase points">
    </span>
    <span id="btnPass" title="calls passData() of Colab" style="cursor: pointer;">⇪</span>

</div>
`