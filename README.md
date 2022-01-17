# plotly-clicks v004

Synthetic data generator for machine learning.

Insert in a Jupiter notebook

```python
from google.colab import output
from IPython.display import HTML

DATA =""
def passData(data):
    global DATA
    DATA = data

output.register_callback('notebook.passData', passData)

html_text = """
    <div id="container"></div>
    <script type="module">
        import * as UI from 'https://cdn.jsdelivr.net/gh/vi-trade/plotly-clicks@v004/index.js'
        UI.createUI('container', 8,4, 800, 400)
    </script>
"""

display(HTML(html_text))

```

When a chart appears
draw data with your mouse and  press `[passData(⇪)]` button to pass it to the notebook.
The data will be saved in `DATA` variable.