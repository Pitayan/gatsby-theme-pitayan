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

      const href = this.getAttribute("href")

      if (history.pushState && href) {
        history.pushState({}, '', href)
        window.dispatchEvent(new Event('hashchange'))
      }

      scrollToTargetAdjusted(this)
    })
  }
}
