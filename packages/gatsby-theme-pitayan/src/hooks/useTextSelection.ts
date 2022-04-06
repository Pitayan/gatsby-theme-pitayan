import { getSelectedTextPosition } from "@pitayan/gatsby-theme-pitayan/src/utils"
import { useCallback, useEffect, useState } from "react"

const events = ["keydown", "keyup", "mouseup"]

export const useTextSelection = (
  container: HTMLElement = document.body,
  offsetWidth = 0,
  offsetHeight = 0,
  lineHeightDelta = 32
): {
  left: number
  top: number
  textContent: string
} => {
  const [left, setLeft] = useState<number>(0)
  const [top, setTop] = useState<number>(0)
  const [textContent, setTextContent] = useState<string>("")

  const checkTextSelection = (e: Event) => {
    setTimeout(() => {
      const {
        x,
        y,
        width,
        height,
        textContent: _textContent,
      } = getSelectedTextPosition()

      let docOffsetTop = 0
      if (container) {
        docOffsetTop =
          container.getBoundingClientRect().y -
          container.offsetTop +
          offsetHeight
      }
      let left =
        height > lineHeightDelta
          ? (e.target as HTMLElement).offsetLeft +
            (e.target as HTMLElement).clientWidth / 2 -
            offsetWidth
          : x + width / 2 - offsetWidth
      let top = y - docOffsetTop

      if (!_textContent) {
        left = top = -9999
      }

      setLeft(left || -9999)
      setTop(top || -9999)
      setTextContent(_textContent)
    }, 0)
  }

  const handler = useCallback(checkTextSelection, [container, offsetWidth, offsetHeight])

  useEffect(() => {
    window.addEventListener("resize", checkTextSelection)

    events.forEach((event: string) => {
      container.addEventListener(event, handler)
    })

    return () => {
      window.removeEventListener("resize", handler)

      events.forEach((event: string) => {
        container.removeEventListener(event, handler)
      })
    }
  }, [container, offsetWidth, offsetHeight])

  return { left, top, textContent }
}
