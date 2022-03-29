import React, { useState, useLayoutEffect, memo } from "react"
import throttle from "lodash/throttle"

type ScrollVisibilityProps = {
  className: string
  hidden?: boolean
  visiblePageYOffset?: number
}

const ScrollVisibility: React.FC<ScrollVisibilityProps> = ({
  className,
  children,
  hidden = true,
  visiblePageYOffset = 500,
}) => {
  const [isHidden, setIsHidden] = useState(hidden)

  const handleVisibility = throttle(() => {
    setIsHidden(window.pageYOffset <= visiblePageYOffset)
  }, 150)

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleVisibility)

    return () => {
      window.removeEventListener("scroll", handleVisibility)
    }
  }, [])

  return (
    <div className={`${isHidden ? "hidden" : ""} ${className}`}>{children}</div>
  )
}

export default memo(ScrollVisibility)
