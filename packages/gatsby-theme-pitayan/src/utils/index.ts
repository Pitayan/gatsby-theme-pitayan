import { PropsWithChildren } from "react"
import { createPortal } from "react-dom"

export { getSelectedTextPosition } from "./textSelection"
export { checkIfDarkMode, toggleDark } from "./toggleTheme"
export { setZoomableImages } from "./zoom"
export { subscribeMailChimp } from "./subscribe"

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
  if (typeof document == "undefined") {
    return null
  }

  return createPortal(props.children, props.mount || document.body)
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
