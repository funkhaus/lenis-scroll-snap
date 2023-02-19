// Test import of styles
import '@/styles/index.scss'

import Lenis from '@studio-freight/lenis'
import {ScrollSnap} from '@/js/scroll-snap'

const lenis = new Lenis({
	orientation:'horizontal',
	wrapper: document.getElementById('wrapper'),
	content: document.getElementById('root'),
});

new ScrollSnap(lenis, {snapType: ''})

function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
window.lenis = lenis