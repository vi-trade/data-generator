export let html = `
<style>

.content {
    border: 1 px solid silver;
    width: 600px;
    height:500px;
    left: 0;    
    top: 0;
    background-color: whitesmoke;
    position: absolute;
}

.cover {
    border: 1px solid red;
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
    <button id="btnPass">⇪</button>
    <input id="chk" type="checkbox" class="chk">
</div>
`