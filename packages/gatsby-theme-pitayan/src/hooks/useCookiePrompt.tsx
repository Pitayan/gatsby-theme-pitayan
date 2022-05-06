import { Link } from "gatsby"
import React, { useLayoutEffect, useState } from "react"
import ReactDom from "react-dom"

import { useSiteMetadata } from "./useSiteMetadata"

const COOKIE_PROMPT_CONTAINER_ID = "cookie-prompt-container"

type NotificationProps = {
  [key: string]: any
}

const DEFAULT_TITLE = "This site uses cookies"
const DEFAULT_DESCRIPTION = `
We use 3rd party tools to understand visitors and create a
personalized experience. By clicking "Agree" button below,
you agree to allowing us to storage cookies on your browser.
`
const DEFAULT_READMORE = `Read more on`
const AGREE_COOKIE = "site-cookie-consent-agreement"

export const Notification: React.FC<NotificationProps> = () => {
  const { siteCookieConsent: { title, description, readMore }, siteLinks } = useSiteMetadata()
  const [isOpen, setIsOpen] = useState(false)

  const privacyLink = siteLinks.find((s) => s.name.match(/privac(y|ies)/))
  const termsLink = siteLinks.find((s) => s.name.match(/term(s?)/))

  const handleAgree = () => {
    if (window.localStorage.getItem(AGREE_COOKIE)) {
      return
    }

    window.localStorage.setItem(AGREE_COOKIE, "true")

    setTimeout(() => {
      setIsOpen(false)
    }, 0)
  }

  useLayoutEffect(() => {
    if (!window.localStorage.getItem(AGREE_COOKIE)) {
      setIsOpen(true)
    }
  })

  return (
    <div className="notification notification-bottom-left rounded">
      <div className={`notification-container ${isOpen ? "open" : ""}`}>
        <h4 className="notification-title">{ title || DEFAULT_TITLE }</h4>
        <p className="mb-2 text-sm">
          { description || DEFAULT_DESCRIPTION }
        </p>
        {(privacyLink || termsLink) &&
          <p className="mb-2 text-sm flex space-x-2">
            <span>{ readMore || DEFAULT_READMORE }</span>
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
