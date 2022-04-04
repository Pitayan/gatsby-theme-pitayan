import mediumZoom, { Zoom } from "medium-zoom"
import { checkIfDarkMode } from "./toggleTheme"

let zoom: Zoom
export const setZoomableImages = (): void => {
  const query =
    "img.gatsby-resp-image-image, .gatsby-resp-image-image picture img"

  const timer = setTimeout(() => {
    if (zoom) {
      zoom.detach()
    }

    zoom = mediumZoom(query, {
      margin: 20,
      get background() {
        // FIXME: for now it's set to static values, should make this reactive to configs
        return checkIfDarkMode() ? "#0f172a" : "#fff"
      },
    })

    clearTimeout(timer)
  }, 500)
}

