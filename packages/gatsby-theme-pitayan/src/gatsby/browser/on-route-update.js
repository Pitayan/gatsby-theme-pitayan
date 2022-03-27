const { setZoomableImages } = require("@pitayan/gatsby-theme-pitayan/src/utils")

module.exports = function onRouteUpdate() {
  // Set gatsby responsive images to zoomable images
  setZoomableImages()
}
