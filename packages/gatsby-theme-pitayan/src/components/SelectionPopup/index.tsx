import React, { memo, useLayoutEffect, useRef, useState } from "react"
import { useTextSelection } from "@pitayan/gatsby-theme-pitayan/src/hooks"
import { CUSTOM_EVENT_SOCIAL_SHARING } from "@pitayan/gatsby-theme-pitayan/src/constants"
import {
  copyToClipboard,
  dispatchCustomEvent,
  Portal,
} from "@pitayan/gatsby-theme-pitayan/src/utils"
import { FiCopy } from "react-icons/fi"
import { SiTwitter } from "react-icons/si"

type PopupContentProps = {
  target: HTMLElement
}

type SelectionPopupProps = {
  target: HTMLElement
}

const PopupContent: React.FC<PopupContentProps> = ({ target }) => {
  const ref = useRef(null)
  const [offsetWidth, setOffsetWidth] = useState<number>(0)
  const [offsetHeight, setOffsetHeight] = useState<number>(0)

  useLayoutEffect(() => {
    if (ref.current) {
      const rect = (ref.current as any).getBoundingClientRect()

      setOffsetWidth(rect.width)
      setOffsetHeight(rect.height)
    } else {
      setOffsetWidth(0)
      setOffsetHeight(0)
    }
  }, [ref])

  const { left, top, textContent } = useTextSelection(
    target,
    // half size of the full popup
    offsetWidth / 2,
    // default height + :after (the triangle bottom) + :after_padding
    offsetHeight + 12
  )

  return (
    <div
      className={`selection-popup absolute justify-center items-center space-x-6 dark:text-black ${
        textContent != "" ? "opacity-100 z-50" : "opacity-0 z-0"
      }`}
      style={{
        left,
        top,
      }}
      ref={ref}
    >
      <span>Share: </span>
      <a
        target="_blank"
        rel="noreferrer"
        onClick={() => dispatchCustomEvent(CUSTOM_EVENT_SOCIAL_SHARING, { share: "Twitter" })}
        href={`https://twitter.com/intent/tweet?text="${textContent}" -- ${window.location.href}`}
      >
        <SiTwitter />
      </a>
      <button
        className="text-gray-500"
        onClick={() => {
          copyToClipboard(textContent)
          dispatchCustomEvent(CUSTOM_EVENT_SOCIAL_SHARING, { share: "copy" })
        }}>
        <FiCopy size={20} />
      </button>
    </div>
  )
}

const SelectionPopup: React.FC<SelectionPopupProps> = ({ target }) => {
  return (
    <Portal>
      <PopupContent target={target} />
    </Portal>
  )
}

export default memo(SelectionPopup)
