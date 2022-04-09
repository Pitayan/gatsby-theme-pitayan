export const scrollToTargetAdjusted = (element: HTMLElement) => {
  const headerOffset = 24
  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  })
}

export const smoothAnchorScroll = () => {
  const headingAnchors = document.getElementsByClassName("heading-anchor")
  for (let i = 0; i < headingAnchors.length; i++) {
    headingAnchors[i].addEventListener('click', function(e: Event) {
      e.preventDefault()

      scrollToTargetAdjusted(this)
    })
  }
}

export const scrollToFragment = () => {

  const scrollTo = () => {
    const { hash } = window.location
    if (hash) {
      const target = document.getElementById(hash.replace("#", ""))

      const timer = setTimeout(() => {

        if (target) {
          scrollToTargetAdjusted(target)
        }

        clearTimeout(timer)
      }, 500)
    }
  }

  scrollTo()

  window.addEventListener("hashchange", scrollTo)
}
