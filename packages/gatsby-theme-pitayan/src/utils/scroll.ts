export const scrollToTargetAdjusted = (element: HTMLElement) => {
  const headerOffset = 24
  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  })
}

export const smoothAnchorScroll = () => {
  const headingAnchors = document.querySelectorAll('a[href^="#"]')
  for (let i = 0; i < headingAnchors.length; i++) {
    headingAnchors[i].addEventListener("click", function (e: Event) {
      e.preventDefault()

      const href = this.getAttribute("href")

      let targetElm = this
      if (!this.classList.contains("heading-anchor")) {
        // Select the a link tag with class name of "heading-anchor". Fallback to current link
        targetElm = document.querySelector(`[id="${href.substring(1)}"] a.heading-anchor`) || this
      }

      if (history.pushState && href) {
        history.pushState({}, "", href)
        window.dispatchEvent(new Event("hashchange"))
      }

      scrollToTargetAdjusted(targetElm)
    })
  }
}
