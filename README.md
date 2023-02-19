# 📦 Lenis Scroll Snap Plugin
This is a [Lenis](https://github.com/studio-freight/lenis/) plugin to mimic scroll-snap css property.

## How to use
````
const lenis = new Lenis({
	direction:'horizontal',
	wrapper: document.getElementById('wrapper'),
	content: document.getElementById('root'),
});

const config = {{snapType: 'mandatory'}}
new ScrollSnap(lenis, config)
````

### Available wrapper attributes
- `scroll-snap-type` ( mandatory | proximity )
  Default value: **mandatory**

### Available element attributes
- `scroll-snap-align` ( start | center | end | none )
  Default value: **start**
### Config
- `snapType`  ( mandatory | proximity )
  This config setting overrides `scroll-snap-type` wrapper attribute value.