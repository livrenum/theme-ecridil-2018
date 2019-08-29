import 'intersection-observer'
import scrollama from 'scrollama'

class Augmentations {

  constructor() {
    this.boundResize = this.resize.bind(this)
    this.setupAugmentations()
  }

  setupAugmentations() {
    
    if (!document.querySelector('.hybritexte-page__scroll-wrapper')) {
      return
    }

    this.scroller = new scrollama()
      .setup({
        container: '.hybritexte-page__scroll-wrapper',
        step: '.hybritexte-augmentation--step-marker',
        offset: 0,
        progress: true
      })

    window.addEventListener('resize', this.boundResize)

    this.scroller.onStepEnter(this.handleStepEnter)
    this.scroller.onStepExit(this.handleStepEnter)
    this.enableAugmentations()
  }
  
  enableAugmentations() {
    // js-enabled by default, but could be disabled in augmentations options
    let augmentations = Array.prototype.slice.call(document.querySelectorAll('[data-augmentation-id]'))
    
    augmentations.forEach(function(b) {
      b.querySelector('.hybritexte-augmentation__inner').classList.add('js-enabled')
    })
  }

  /**
   * Handle step trigger
   * @param {object} t trigger object
   */
  handleStepEnter(response) {
    // reset augmentations
    let augmentations = Array.prototype.slice.call(document.querySelectorAll('.hybritexte-augmentation__augmentation'))

    augmentations.forEach(function(b) {
//      b.classList.remove('is-active', 'is-stuck')
    })
    // END reset augmentations

    let beforeId = response.element.getAttribute('data-augmentation-before')
    let afterId = response.element.getAttribute('data-augmentation-after')

    if ('up' === response.direction && afterId) {
      let matchingElem = document.querySelector('[data-augmentation-id="' + afterId + '"]')
      matchingElem && matchingElem.classList.remove('is-active', 'is-stuck')
    } else if ('down' === response.direction && afterId) {
      let matchingElem = document.querySelector('[data-augmentation-id="' + afterId + '"]')
      matchingElem && matchingElem.classList.add('is-active', 'is-stuck')
    }
  }

  resize() {
    if (this.scroller) {
      this.scroller.resize()
    }
  }
  
  destroy() {
    window.removeEventListener('resize', this.boundResize)
    if (this.scroller) {
      this.scroller.destroy()
    }
  }
}

export default Augmentations
