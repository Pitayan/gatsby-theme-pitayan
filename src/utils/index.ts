export const checkIfDarkMode = (): boolean => {
  if (typeof window !== "undefined") {
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
  }
}

export const toggleDark = (isDark: boolean): void => {
  if (isDark) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  // Whenever the user explicitly chooses light mode
  localStorage.theme = isDark ? "dark" : "light"
}

export const copyToClipboard = (toCopy: string) => {
  const el = document.createElement(`textarea`)
  el.value = toCopy
  el.setAttribute(`readonly`, ``)
  el.style.position = `absolute`
  el.style.left = `-9999px`
  document.body.appendChild(el)
  el.select()
  document.execCommand(`copy`)
  document.body.removeChild(el)
}
