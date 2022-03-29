import { PropsWithChildren } from "react"
import { createPortal } from "react-dom"
import mediumZoom, { Zoom } from "medium-zoom"
import { useStaticQuery, graphql } from "gatsby"

export const checkIfDarkMode = (): boolean => {
  if (typeof window !== "undefined") {
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
  }

  return false
}

export const toggleDark = (isDark: boolean): void => {
  if (isDark) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  // Whenever the user explicitly chooses light mode
  localStorage.theme = isDark ? "dark" : "light"

  setZoomableImages()
}

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

export const copyToClipboard = (toCopy: string): void => {
  const el = document.createElement(`textarea`)
  el.value = toCopy
  el.setAttribute(`readonly`, ``)
  el.style.position = `absolute`
  el.style.left = `-9999px`
  document.body.appendChild(el)
  el.select()
  document.execCommand(`copy`)
  document.body.removeChild(el)
}

export const Portal = (
  props: PropsWithChildren<{ mount?: HTMLElement }>
): React.ReactPortal => {
  return createPortal(props.children, props.mount || document.body)
}

export const getSelectionRangeClientXY = (
  selection: Selection
): { x: number; y: number } => {
  const range = selection.getRangeAt(0).cloneRange()
  let x = 0,
    y = 0

  if (range.getClientRects) {
    range.collapse(true)
    const clientRects = range.getClientRects()

    if (clientRects.length > 0) {
      x = clientRects[0].left
      y = clientRects[0].top
    }
  }

  return { x, y }
}

export const getSelectionBoundlingClientWidthHeight = (
  selection: Selection
): {
  width: number
  height: number
} => {
  const range = selection.getRangeAt(0).cloneRange()
  let width = 0,
    height = 0

  if (range.getBoundingClientRect) {
    const clientRect = range.getBoundingClientRect()
    width = clientRect.right - clientRect.left
    height = clientRect.bottom - clientRect.top
  }

  return { width, height }
}

export const getSelectedTextPosition = (): {
  x: number
  y: number
  width: number
  height: number
  textContent: string
} => {
  const selection = window.getSelection()

  if (!selection || selection.rangeCount < 1) {
    return { x: 0, y: 0, width: 0, height: 0, textContent: "" }
  }

  const textContent = selection.toString().trim()

  const { x, y } = getSelectionRangeClientXY(selection)

  const { width, height } = getSelectionBoundlingClientWidthHeight(selection)

  return { x, y, width, height, textContent }
}

export const objectToGetParams = (
  object: Record<string, string | number | undefined | null>
): string => {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
  return params.length > 0 ? `?${params.join("&")}` : ""
}

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            name
            siteUrl
            description
            links {
              name
              url
              group
              internal
            }
          }
        }
      }
    `
  )

  return site.siteMetadata
}
