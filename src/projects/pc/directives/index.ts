export default {
    'scroll-hover': {
        inserted: (el: HTMLElement): void => {
            el.addEventListener('mouseover', (e) => {
                el.children[1].classList.add('show')
                el.children[2].classList.add('show')
                e.stopPropagation()
            }, false)
            el.addEventListener('mouseout', (e) => {
                el.children[1].classList.remove('show')
                el.children[2].classList.remove('show')
                e.stopPropagation()
            }, false)
        }
    }
}
