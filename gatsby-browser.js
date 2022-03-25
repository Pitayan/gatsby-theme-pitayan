// global stylesheet
import "@/assets/css/style.css"

// Polyfill smooth scroll
import smoothscroll from "smoothscroll-polyfill"
import { checkIfDarkMode, toggleDark, setZoomableImages } from "@/utils"

import "typeface-merriweather"

// toggle Dark mode
toggleDark(checkIfDarkMode())

// kick off polyfill
smoothscroll.polyfill()

export const onRouteUpdate = () => {
  // Set gatsby responsive images to zoomable images
  setZoomableImages()
}
