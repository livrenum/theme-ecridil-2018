import 'intersection-observer'
import scrollama from 'scrollama'

const scrollWrapperSelector = '.hybrilivre-augmentation__scroll-wrapper'
const augmentationSelector = '.hybrilivre-augmentation__augmentation'
const stepSelector = ".hybrilivre-augmentation__step-marker"
const scroller = setupAugmentations()

resize()

window.addEventListener("resize", resize)

function setupAugmentations() {
  return scrollama()
    .setup({
      container: scrollWrapperSelector,
      step: stepSelector,
      offset: 0.66,
      progress: true,
    })
    .onStepEnter(handleStepEnter)
}

/**
 * Handle step trigger
 * @param {object} t trigger object
 */
function handleStepEnter(t) {
  console.log("handle step enter", t);
  resetAugmentations()

  var e = t.element.getAttribute("data-augmentation-before"),
      n = t.element.getAttribute("data-augmentation-after");
  
  if ("up" === t.direction && e) {
    document.querySelector('[data-augmentation-id="' + e + '"]').classList.add("is-active")
  } else if ("down" === t.direction && n) {
    document.querySelector('[data-augmentation-id="' + n + '"]').classList.add("is-active")
  }
}

function handleStepExit() {
  console.log('exit')
//  annotElem.classList.remove('is-active')
}
function resetAugmentations() {
  var t = Array.prototype.slice.call(document.querySelectorAll(augmentationSelector))
  
  console.log("reset all augm", t)
  
  t.forEach(function(t) {
    t.classList.remove("is-active")
  })
}

function resize() {
  scroller.resize()
}
