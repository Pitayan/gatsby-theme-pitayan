// Polyfill smooth scroll
import smoothscroll from "smoothscroll-polyfill"
import { smoothAnchorScroll, setZoomableImages } from "@pitayan/gatsby-theme-pitayan/src/utils"
import { CUSTOM_EVENT_TOGGLE_THEME } from "@pitayan/gatsby-theme-pitayan/src/constants"

export function onInitialClientRender() {
  // kick off polyfill
  smoothscroll.polyfill()

  smoothAnchorScroll()

  document.addEventListener(CUSTOM_EVENT_TOGGLE_THEME, () => {
    setZoomableImages()
  })
}
