const clickedOutsideDirective = {
    mounted(element, binding) {
        const clickEventHandler = (event) => {
            if (!element.contains(event.target)) {
                binding.value(event)
            }
        }
        element.__clickedOutsideHandler__ = clickEventHandler
        document.addEventListener('click', clickEventHandler)
        document.addEventListener('touchstart', clickEventHandler)
    },
    unmounted(element) {
        document.removeEventListener('click', element.__clickedOutsideHandler__)
        document.removeEventListener('touchstart', element.__clickedOutsideHandler__)
    }
}

export default clickedOutsideDirective
