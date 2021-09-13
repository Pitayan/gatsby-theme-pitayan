import React, { useState } from 'react'
import { RiSunLine, RiMoonLine } from 'react-icons/ri'
import { checkIfDarkMode, toggleDark } from '@/utils'

const DarkModeToggle: React.FC<{}> = () => {

  let [isDark, setDark] = useState(checkIfDarkMode())

  const toggle = () => {
    toggleDark(!isDark)
    setDark(!isDark)
  }

  return (
    <span onClick={toggle} className="text-3xl ghost cursor-pointer">
      {isDark
        ? <RiSunLine className="animate-fade-in-scale" />
        : <RiMoonLine className="animate-fade-in-scale" />
      }
    </span>
  )
}

export default DarkModeToggle
