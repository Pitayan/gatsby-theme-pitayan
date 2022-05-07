import { setZoomableImages, smoothAnchorScroll, } from "@pitayan/gatsby-theme-pitayan/src/utils"

export function onRouteUpdate() {
  // Set gatsby responsive images to zoomable images
  setZoomableImages()

  smoothAnchorScroll()
}
