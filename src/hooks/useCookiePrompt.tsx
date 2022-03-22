import { Link } from "gatsby"
import React, { useLayoutEffect, useState } from "react"
import ReactDom from "react-dom"

const COOKIE_PROMPT_CONTAINER_ID = "cookie-prompt-container"

type NotificationProps = {
  [key: string]: any
}

const AGREE_COOKIE = "agree-site-cookie"

export const Notification: React.FC<NotificationProps> = () => {
  const [isOpen, setIsOpen] = useState(false)

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
    <div className="notification notification-bottom-center rounded">
      <div className={`notification-container ${isOpen ? "open" : ""}`}>
        <h5 className="notification-title">This site uses cookies</h5>
        <p className="mb-1 text-sm">
          We use 3rd party tools to understand visitors and create a
          personalized experience. By clicking &quot;Agree&quot; button below,
          you agree to allowing us to storage cookies on your browser.
          Read&nbsp;
          <Link className="site-link underline" to="/terms-and-conditions">
            terms
          </Link>
          &nbsp;and&nbsp;
          <Link className="site-link underline" to="/privacy-policy">
            privacies
          </Link>
          &nbsp;to know more about our site policies.
        </p>
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
