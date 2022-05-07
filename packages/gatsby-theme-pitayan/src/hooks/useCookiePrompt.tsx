import { Link } from "gatsby"
import React, { useLayoutEffect, useState } from "react"
import ReactDom from "react-dom"

import { useSiteMetadata } from "./useSiteMetadata"
import {
  COOKIE_PROMPT_AGREEMENT,
  COOKIE_PROMPT_CONTAINER_ID,
  COOKIE_PROMPT_DEFAULT_DESCRIPTION,
  COOKIE_PROMPT_DEFAULT_READMORE,
  COOKIE_PROMPT_DEFAULT_TITLE,
} from "@pitayan/gatsby-theme-pitayan/src/constants"

type NotificationProps = {
  [key: string]: any
}

export const Notification: React.FC<NotificationProps> = () => {
  const { siteCookieConsent: { title, description, readMore }, siteLinks } = useSiteMetadata()
  const [isOpen, setIsOpen] = useState(false)

  const privacyLink = siteLinks.find((s) => s.name.match(/privac(y|ies)/))
  const termsLink = siteLinks.find((s) => s.name.match(/term(s?)/))

  const handleAgree = () => {
    if (window.localStorage.getItem(COOKIE_PROMPT_AGREEMENT)) {
      return
    }

    window.localStorage.setItem(COOKIE_PROMPT_AGREEMENT, "true")

    setTimeout(() => {
      setIsOpen(false)
    }, 0)
  }

  useLayoutEffect(() => {
    if (!window.localStorage.getItem(COOKIE_PROMPT_AGREEMENT)) {
      setIsOpen(true)
    }
  })

  return (
    <div className="notification notification-bottom-left rounded">
      <div className={`notification-container ${isOpen ? "open" : ""}`}>
        <h4 className="notification-title">{ title || COOKIE_PROMPT_DEFAULT_TITLE }</h4>
        <p className="mb-2 text-sm">
          { description || COOKIE_PROMPT_DEFAULT_DESCRIPTION }
        </p>
        {(privacyLink || termsLink) &&
          <p className="mb-2 text-sm flex space-x-2">
            <span>{ readMore || COOKIE_PROMPT_DEFAULT_READMORE }</span>
            {privacyLink && <Link className="site-link underline" to={privacyLink.url}>{privacyLink.name}</Link>}
            {termsLink && <Link className="site-link underline" to={termsLink.url}>{termsLink.name}</Link>}
          </p>
        }
        <div className="text-right font-bold">
          <button className="ghost-button" onClick={handleAgree}>
            Agree
          </button>
        </div>
      </div>
    </div>
  )
}

export const useCookiePrompt = (): void => {
  useLayoutEffect(() => {
    let containerElm = document.getElementById(COOKIE_PROMPT_CONTAINER_ID)

    if (!containerElm) {
      containerElm = document.createElement("div")
      containerElm.id = COOKIE_PROMPT_CONTAINER_ID
    }

    ReactDom.render(<Notification />, document.body.appendChild(containerElm))
  }, [])
}
