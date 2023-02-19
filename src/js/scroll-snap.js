// https://blog.logrocket.com/style-scroll-snap-points-css/
// https://codepen.io/alsacreations/pen/GaebzJ
// snap/onSnapComplete https://greensock.com/docs/v3/Plugins/ScrollTrigger
export class ScrollSnap {
  constructor(lenis, { snapType }) {
    this.lenis = lenis
    this.isHorizontal = this.lenis.direction === 'horizontal' // we can set different value in case we need snap for different axis.
    this.rootElement = this.lenis.wrapperNode === window ? this.lenis.contentNode : this.lenis.wrapperNode
    this.snapType = snapType || this.rootElement.getAttribute('scroll-snap-type') || 'mandatory'

    this.initElements()
    lenis.on('scroll', this.onScroll)
  }

  initElements() {
    this.elements = Array.from(
      this.rootElement.querySelectorAll(
        '[scroll-snap-align]:not([scroll-snap-align="none"]'
      )
    ).map((element) => {
      let snapAlign = element.getAttribute('scroll-snap-align')
      if (!['start', 'center', 'end', 'none'].includes(snapAlign)) {
        snapAlign = 'start' // default value: start
      }

      // let snapStop = element.getAttribute('scroll-snap-stop')
      // if (!['normal', 'always'].includes(snapAlign)) {
      //   snapStop = 'normal' // default value: start
      // }

      return {
        element,
        snapAlign,
        // snapStop,
      }
    })
  }

  onScroll = ({ velocity }) => {
    if (Math.abs(velocity) > 0.1) return

    const wrapperRect =
      this.lenis.wrapperNode === window
        ? {
            left: 0,
            top: 0,
            width: this.lenis.wrapperWidth,
            height: this.lenis.wrapperHeight,
          }
        : this.lenis.wrapperNode.getBoundingClientRect()

    const wrapperPos = this.isHorizontal ? wrapperRect.left : wrapperRect.top

    // find the closest element according to the scroll position
    const elements = this.elements
      .map(({ element, snapAlign }) => {
        const elRect = element.getBoundingClientRect()

        let offset = 0
        if ('end' === snapAlign) {
          offset = this.isHorizontal
            ? elRect.width - wrapperRect.width
            : elRect.height - wrapperRect.height
        } else if ('center' === snapAlign) {
          offset = this.isHorizontal
            ? (elRect.width - wrapperRect.width) / 2
            : (elRect.height - wrapperRect.height) / 2
        }

        const elPos = this.isHorizontal ? elRect.left : elRect.top

        const distance = Math.abs(elPos - wrapperPos + offset)
        return { element, distance, elRect, offset }
      })
      .sort((a, b) => a.distance - b.distance)

    let limit = this.isHorizontal ? wrapperRect.width : wrapperRect.height
    if ( 'proximity' === this.snapType ) {
      limit *= 0.3 // proximity is 30%
    }

    const element = elements[0]
    if (element.distance >= limit) {
      return
    }

    this.lenis.scrollTo(element.element, { offset: element.offset })
  }
}
