import { getSelectedTextPosition } from "@/utils"
import { useCallback, useLayoutEffect, useState } from "react"

const events = ["keydown", "keyup", "mouseup", "resize"]

export const useTextSelection = (
  container: HTMLElement,
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

  const checkTextSelection = useCallback(
    (e: Event) => {
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

        setLeft(left)
        setTop(top)
        setTextContent(_textContent)
      }, 0)
    },
    [container]
  )

  useLayoutEffect(() => {
    events.forEach((event: string) => {
      window.addEventListener(event, checkTextSelection)
    })

    return () => {
      events.forEach((event: string) => {
        window.removeEventListener(event, checkTextSelection)
      })
    }
  }, [container])

  return { left, top, textContent }
}
