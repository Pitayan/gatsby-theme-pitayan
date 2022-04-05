import { useLayoutEffect, useRef, useState } from "react"

export const useScrollToFragment = (): void => {
  const scrolledRef = useRef(false)
  const [hash, setHash] = useState("")
  const hashRef = useRef(hash)

  const scrollTo = () => {
    if (hash) {
      // Reset hash if hash changed
      if (hashRef.current !== hash) {
        hashRef.current = hash
        scrolledRef.current = false
      }

      if (!scrolledRef.current) {
        const target = document.getElementById(hash.replace("#", ""))

        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
          scrolledRef.current = true
        }
      }
    }
  }

  useLayoutEffect(() => {
    setHash(window.location.href)

    scrollTo()

    window.addEventListener("hashchange", scrollTo)
  }, [])
}
