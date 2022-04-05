import React, { memo, useState } from "react"
import { subscribeMailChimp } from "@pitayan/gatsby-theme-pitayan/src/utils"

type SubscriptionPanelProps = {
  className: string
}

const SubscriptionPanel: React.FC<SubscriptionPanelProps> = ({ className= "" }) => {
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
    <div className={`subscription mark-w-xl ${className}`}>
      <div className="subscription-container">
        <h3 className="subscription-title">
          Subscribe to our email newsletters
        </h3>
        <div className="subscription-content">
          Stay tuned to our latest content with the ability to opt-out at
          anytime. We will not spam your inbox or share your email with any
          third parties.
        </div>
        <form className="subscription-action" onSubmit={handleOnSubmit}>
          <div className="w-full relative">
            <span className="absolute top-[23%] left-3 text-gray-500">@</span>
            <input
              placeholder="your email address"
              name="email"
              type="email"
              className="outline-input !pr-32 !pl-8"
              value={email}
              onChange={handleOnChange}
              formNoValidate
            />
            <button
              className="ghost-button ml-auto absolute top-[2%] right-0"
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
        </form>
      </div>
    </div>
  )
}

export default memo(SubscriptionPanel)
