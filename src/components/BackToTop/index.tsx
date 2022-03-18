import React, { useState, useLayoutEffect } from "react"
import { RiArrowUpSLine } from "react-icons/ri"
import throttle from "lodash/throttle"

type Props = {
  [key: string]: any
}

const BackToTop: React.FC<Props> = () => {
  const [isHidden, setIsHidden] = useState(true)

  const handleVisibility = throttle(() => {
    setIsHidden(window.pageYOffset <= 500)
  }, 150)

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleVisibility)

    return () => {
      window.removeEventListener("scroll", handleVisibility)
    }
  }, [])

  return (
    <div
      className={`fixed right-[6%] bottom-[6%] opacity-20 hover:opacity-80 transition-opacity duration-150 ease-in-out z-50 ${
        isHidden ? "hidden" : ""
      }`}
    >
      <button className="ghost text-4xl" onClick={scrollTop}>
        <RiArrowUpSLine />
      </button>
    </div>
  )
}

export default BackToTop
