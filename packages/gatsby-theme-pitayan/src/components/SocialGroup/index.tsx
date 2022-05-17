import React, { memo } from "react"

import { SOCIAL_RESOURCES } from "@pitayan/gatsby-theme-pitayan/src/constants"

type SocialIconsProps = {
  icon: string
  className?: string
}

type SocialGroupProps = {
  data: [string, string][]
  className?: string
}

const SocialIcon: React.FC<SocialIconsProps> = ({ icon, className = "" }) => {
  const Icon = SOCIAL_RESOURCES[icon].icon

  return <Icon className={className} />
}

const SocialGroup: React.FC<SocialGroupProps> = ({ data, className = "" }) => {
  return (
    <ul className={`list-none grid grid-flow-col-dense auto-cols-auto ${className}`}>
      {data.map(([sns, profile]) => {
        let href = `${SOCIAL_RESOURCES[sns]?.url}/${profile}`

        // Use the given url If the given platform id is an HTTP url or "mailto"
        if (/^(?:https?:\/\/)/.test(profile) || /^mailto:/.test(profile)) {
          href = profile
        }

        return (
          <li key={sns}>
            <a href={href} target="_blank" rel="noreferrer">
              <SocialIcon className="site-link" icon={sns} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default memo(SocialGroup)
