import React, { memo, useState } from "react"

import {
  CUSTOM_EVENT_SUBSCRIPTION,
  SUBSCRIPTION_DEFAULT_DESCRIPTION,
  SUBSCRIPTION_DEFAULT_TITLE
} from "@pitayan/gatsby-theme-pitayan/src/constants"
import { dispatchCustomEvent, subscribeMailChimp } from "@pitayan/gatsby-theme-pitayan/src/utils"
import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"

type SubscriptionPanelProps = {
  className?: string
}

const SubscriptionPanel: React.FC<SubscriptionPanelProps> = ({
  className = "",
}) => {
  const { siteSubscription: { title, description } } = useSiteMetadata()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    subscribeMailChimp(email)
      .then(data => {
        if ((data as any).result === "error") {
          throw data
        }

        setSubscribed(true)
        setMessage("Subscribed!")

        dispatchCustomEvent(CUSTOM_EVENT_SUBSCRIPTION, { email })

        setTimeout(() => {
          setSubscribed(false)
          setEmail("")
          setMessage("")
        }, 6000)
      })
      .catch(error => {
        setMessage(error.msg)
      })
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    setEmail(value)
    setMessage("")
  }

  return (
    <div className={`subscription ${className}`}>
      <div className="subscription-container">
        <h3 className="subscription-title">
          { title || SUBSCRIPTION_DEFAULT_TITLE }
        </h3>
        <div className="subscription-content">
          { description || SUBSCRIPTION_DEFAULT_DESCRIPTION }
        </div>
        <form className="subscription-action" onSubmit={handleOnSubmit}>
          <div className="w-full relative max-w-lg mx-auto">
            <span className="absolute top-[23%] left-3 text-gray-400 dark:text-gray-500">
              @
            </span>
            <input
              placeholder="your email"
              name="email"
              type="email"
              className="outline-input md:!pr-32 !pl-8"
              value={email}
              onChange={handleOnChange}
              formNoValidate
            />
            <button
              className="ghost-button ml-auto absolute top-[2%] right-0 hidden md:block"
              type="submit"
              disabled={subscribed}
            >
              Subscribe
            </button>
          </div>
          <small
            className={`block mt-2 ${
              subscribed ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </small>
          <br />
          <div className="w-full text-center -mb-2">
            <button
              className="ghost-button md:hidden block mx-auto"
              type="submit"
              disabled={subscribed}
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default memo(SubscriptionPanel)
