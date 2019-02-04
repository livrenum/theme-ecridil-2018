import 'intersection-observer'
import scrollama from 'scrollama'

const scroller = scrollama()

const scrollWrapper = document.querySelector('.scroll__wrapper')
const textCol = scrollWrapper.querySelector('.scroll__col_text')
const annotCol = scrollWrapper.querySelector('.scroll__col_annotation')
const annotElem = annotCol.querySelector('.annotation')
const steps = textCol.querySelectorAll('.annotation__reftext')


scroller
  .setup({
    step: '.scroll__col_text .annotation__reftext',
    container: '.scroll__wrapper',
    graphic: '.scroll__col_annotation',
    offset: 0.5
  })
  .onStepEnter(handleStepEnter)
  .onStepExit(handleStepExit)


function handleStepEnter() {
  console.log('enter')
  annotElem.classList.add('is-active')
}

function handleStepExit() {
  console.log('exit')
  annotElem.classList.remove('is-active')
}
