import React, { memo, useState } from "react"
import { RiSunLine, RiMoonClearFill } from "react-icons/ri"
import {
  checkIfDarkMode,
  toggleDark,
} from "@pitayan/gatsby-theme-pitayan/src/utils"

const DarkModeToggle: React.FC = () => {
  const [isDark, setDark] = useState(checkIfDarkMode())

  const onClickToggle = () => {
    toggleDark(!isDark)
    setDark(!isDark)
  }

  return (
    <button onClick={onClickToggle} className="site-link">
      {isDark ? (
        <RiSunLine className="animate-fade-in-scale" />
      ) : (
        <RiMoonClearFill className="animate-fade-in-scale" />
      )}
    </button>
  )
}

export default memo(DarkModeToggle)
