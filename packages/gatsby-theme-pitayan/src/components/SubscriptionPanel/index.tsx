import React, { memo } from "react"

type SubscriptionPanelProps = {
  className: string
}

const SubscriptionPanel: React.FC<SubscriptionPanelProps> = ({ className }) => {
  return (
    <div className={`subscription mark-w-xl ${className}`}>
      <h3 className="subscription-title">
        Join our email list and get notified about new content
      </h3>
      <div className="subscription-content">
        Be the first to receive our latest content with the ability to opt-out
        at anytime. We promise to not spam your inbox or share your email with
        any third parties.
      </div>
      <form className="subscription-action">
        <input
          placeholder="your@email.com"
          name="email"
          type="email"
          className="outline-input md:max-w-md mb-8 md:mb-0"
        />
        <button className="fill-button ml-auto">Subscribe</button>
      </form>
    </div>
  )
}

export default memo(SubscriptionPanel)