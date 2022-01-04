import React, { useState } from "react"
import { RiSunLine, RiMoonFill } from "react-icons/ri"
import { checkIfDarkMode, toggleDark } from "@/utils"

const DarkModeToggle: React.FC = () => {
  const [isDark, setDark] = useState(checkIfDarkMode())

  const toggle = () => {
    toggleDark(!isDark)
    setDark(!isDark)
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={toggle}
      className="cursor-pointer text-gray-500"
    >
      {isDark ? (
        <RiSunLine className="animate-fade-in-scale" />
      ) : (
        <RiMoonFill className="animate-fade-in-scale" />
      )}
    </span>
  )
}

export default DarkModeToggle
