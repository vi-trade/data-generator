# data-generator

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
        import * as dg from 'https://cdn.jsdelivr.net/gh/vi-trade/data-generator/public/data-generator.js'
        dg.DataGenerator('passData', 'container', 8, 4, 800, 400)
    </script>
"""

display(HTML(html_text))

```

When a chart appears
draw data with your mouse and  press `[passData(⇪)]` button to pass it to the notebook.
The data will be saved in `DATA` variable.


Make a daframe and display the passed DATA 

```python
data = DATA['data']
df = pd.DataFrame({'x':data['x'], 'y':data['y'], 'c': data['marker']['color']})
display(df)

````

Mathplotlib

```python

%config InlineBackend.figure_format='retina'
df.plot.scatter( x='x',y='y', s=3, c='c', colormap="jet", grid=True, figsize=(16,6), backend="matplotlib");

```

Plotly rechart data

```python
import plotly.graph_objects as go
go.Figure(DATA['data'], DATA['layout'])
```

change some data points

```python
syn_data = DATA['data']
syn_data['x']=df['x']
syn_data['y']=df['y']
syn_data['marker']['color']=df['c']

syn_layout = DATA['layout']
syn_layout['title']='Changed data'

fig = go.Figure(syn_data, syn_layout)
fig.show()
```

