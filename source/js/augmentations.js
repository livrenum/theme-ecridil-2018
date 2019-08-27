import 'intersection-observer'
import scrollama from 'scrollama'

class Augmentations {

  constructor() {
    this.setupAugmentations()
  }

  setupAugmentations() {
    
    if (!document.querySelector('.hybritexte-page__scroll-wrapper')) {
      return;
    }

    this.scroller = new scrollama()
      .setup({
        container: '.hybritexte-page__scroll-wrapper',
        step: '.hybritexte-augmentation__step-marker',
        offset: 0.66,
        progress: true,
      })
    
    this.resize()

    window.addEventListener('resize', this.resize)
    
    this.scroller.onStepEnter(this.handleStepEnter)
  }

  /**
   * Handle step trigger
   * @param {object} t trigger object
   */
  handleStepEnter(t) {
    console.log('handle step enter', t)
    
    // reset augmentations
    let a = Array.prototype.slice.call(document.querySelectorAll('.hybritexte-augmentation__augmentation'))

    console.log('reset all augm', a)

    a.forEach(function(b) {
      b.classList.remove('is-active')
    })
    // reset augmentations END

    var e = t.element.getAttribute('data-augmentation-before'),
        n = t.element.getAttribute('data-augmentation-after');

    if ('up' === t.direction && e) {
      document.querySelector('[data-augmentation-id="' + e + '"]').classList.add('is-active')
    } else if ('down' === t.direction && n) {
      document.querySelector('[data-augmentation-id="' + n + '"]').classList.add('is-active')
    }
  }

  resize() {
    this.scroller.resize()
  }
  
  destroy() {
    window.removeEventListener('resize', this.resize)
    if (this.scroller) {
      this.scroller.destroy()
    }
  }
}

export default Augmentations
