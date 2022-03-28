import React from "react"
import { RiArrowUpSLine } from "react-icons/ri"

type BackToTopProps = {
  className?: string
}

const BackToTop: React.FC<BackToTopProps> = ({ className }) => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      className={`opacity-20 hover:opacity-80 transition-opacity duration-150 ease-in-out z-50 ${className}`}
    >
      <button className="ghost text-4xl" onClick={scrollTop}>
        <RiArrowUpSLine />
      </button>
    </div>
  )
}

export default BackToTop
