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
    alert('about to setup scroll')

    this.scroller = new scrollama()
      .setup({
        container: '.hybritexte-page__scroll-wrapper',
        step: '.hybritexte-augmentation__step-marker',
        offset: 0,
        progress: true
      })

    window.addEventListener('resize', this.boundResize)

    this.scroller.onStepEnter(this.handleStepEnter)
  }

  /**
   * Handle step trigger
   * @param {object} t trigger object
   */
  handleStepEnter(response) {
    console.log('handle step enter', response)
    
    // reset augmentations
    let a = Array.prototype.slice.call(document.querySelectorAll('.hybritexte-augmentation__augmentation'))

    a.forEach(function(b) {
      b.classList.remove('is-active')
    })
    // reset augmentations END

    let beforeId = response.element.getAttribute('data-augmentation-before')
    let afterId = response.element.getAttribute('data-augmentation-after')

    if ('up' === response.direction && beforeId) {
      document.querySelector('[data-augmentation-id="' + beforeId + '"]').classList.add('is-active')
    } else if ('down' === response.direction && afterId) {
      document.querySelector('[data-augmentation-id="' + afterId + '"]').classList.add('is-active')
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
