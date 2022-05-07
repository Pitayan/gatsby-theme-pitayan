import { dispatchCustomEvent } from "./customEvent"
import { CUSTOM_EVENT_TOGGLE_THEME } from '@pitayan/gatsby-theme-pitayan/src/constants'

export const checkIfDarkMode = (): boolean => {
  if (typeof window !== "undefined") {
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
  }

  return false
}

export const toggleDark = (isDark: boolean): void => {
  if (isDark) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  // Whenever the user explicitly chooses light mode
  localStorage.theme = isDark ? "dark" : "light"

  // Dispatch Custom event
  dispatchCustomEvent(CUSTOM_EVENT_TOGGLE_THEME, { theme: localStorage.theme })
}
