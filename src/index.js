// Test import of styles
import '@/styles/index.scss'

import Lenis from '@studio-freight/lenis'
import {ScrollSnap} from '@/js/scroll-snap'

const lenis = new Lenis({
	direction:'horizontal',
	wrapper: document.getElementById('wrapper'),
	content: document.getElementById('root'),
});

new ScrollSnap(lenis, {snapType: ''})

const lenisMandatory = new Lenis({
	direction:'vertical',
	wrapper: document.getElementById('wrapper-mandatory'),
	content: document.getElementById('root-mandatory'),
});

new ScrollSnap(lenisMandatory, {snapType: ''})

function raf(time) {
	lenis.raf(time)
	lenisMandatory.raf(time)
	requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
window.lenis = lenis