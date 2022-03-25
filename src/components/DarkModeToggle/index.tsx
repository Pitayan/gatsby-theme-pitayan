import React, { useState } from "react"
import { RiSunLine, RiMoonFill } from "react-icons/ri"
import { checkIfDarkMode, toggleDark } from "@/utils"

const DarkModeToggle: React.FC = () => {
  const [isDark, setDark] = useState(checkIfDarkMode())

  const onClickToggle = () => {
    toggleDark(!isDark)
    setDark(!isDark)
  }

  return (
    <button onClick={onClickToggle} className="text-gray-500">
      {isDark ? (
        <RiSunLine className="animate-fade-in-scale" />
      ) : (
        <RiMoonFill className="animate-fade-in-scale" />
      )}
    </button>
  )
}

export default DarkModeToggle
