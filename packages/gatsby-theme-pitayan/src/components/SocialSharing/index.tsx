import React, { memo } from "react"
import { RiLinkM } from "react-icons/ri"

import { objectToGetParams, copyToClipboard, dispatchCustomEvent } from "@pitayan/gatsby-theme-pitayan/src/utils"
import { CUSTOM_EVENT_SOCIAL_SHARING, SOCIAL_RESOURCES } from "@pitayan/gatsby-theme-pitayan/src/constants"
import Tooltip from "@pitayan/gatsby-theme-pitayan/src/components/Tooltip"

type SocialSharingProps = {
  title: string
  url: string
  hashtags: string
  description: string
  className?: string
  twitter?: boolean
  facebook?: boolean
  linkedin?: boolean
  pocket?: boolean
  copy?: boolean
}

const TwitterIcon = SOCIAL_RESOURCES.twitter.icon
const FacebookIcon = SOCIAL_RESOURCES.facebook.icon
const LinkedinIcon = SOCIAL_RESOURCES.linkedin.icon
const PocketIcon = SOCIAL_RESOURCES.pocket.icon

const SocialSharing: React.FC<SocialSharingProps> = ({
  title,
  url,
  hashtags,
  description,
  className = "",
  twitter,
  facebook,
  linkedin,
  pocket,
  copy,
}) => {
  return (
    <span className={`flex items-center ${className}`}>
      {twitter && (
        <Tooltip text="Share to Twitter">
          <div className="site-link">
            <a
              target="_blank"
              rel="noreferrer"
              onClick={() => dispatchCustomEvent(CUSTOM_EVENT_SOCIAL_SHARING, { share: 'Twitter' })}
              href={`https://twitter.com/share${objectToGetParams({
                title,
                url,
                hashtags,
              })}`}
            >
              <TwitterIcon />
            </a>
          </div>
        </Tooltip>
      )}
      {facebook && (
        <Tooltip text="Share to Facebook">
          <div className="site-link">
            <a
              target="_blank"
              rel="noreferrer"
              onClick={() => dispatchCustomEvent(CUSTOM_EVENT_SOCIAL_SHARING, { share: 'Facebook' })}
              href={`https://www.facebook.com/sharer/sharer.php${objectToGetParams({
                title,
                u: url,
                description: description,
                hashtag: hashtags,
              })}`}
            >
              <FacebookIcon />
            </a>
          </div>
        </Tooltip>
      )}
      {linkedin && (
        <Tooltip text="Share to Linkedin">
          <div className="site-link">
            <a
              target="_blank"
              rel="noreferrer"
              onClick={() => dispatchCustomEvent(CUSTOM_EVENT_SOCIAL_SHARING, { share: 'Linkedin' })}
              href={`https://linkedin.com/shareArticle${objectToGetParams({
                title,
                url,
                summary: description,
              })}`}
            >
              <LinkedinIcon />
            </a>
          </div>
        </Tooltip>
      )}
      {pocket && (
        <Tooltip text="Share to Pocket">
          <div className="site-link">
            <a
              target="_blank"
              rel="noreferrer"
              onClick={() => dispatchCustomEvent(CUSTOM_EVENT_SOCIAL_SHARING, { share: 'Pocket' })}
              href={`https://getpocket.com/save${objectToGetParams({
                title,
                url,
              })}`}
            >
              <PocketIcon />
            </a>
          </div>
        </Tooltip>
      )}
      {copy && (
        <Tooltip text="Copy URL address">
          <div className="site-link">
            <a onClick={() => {
              copyToClipboard(window.location.href)
              dispatchCustomEvent(CUSTOM_EVENT_SOCIAL_SHARING, { share: 'copy' })
            }}>
              <RiLinkM className="text-[110%]" />
            </a>
          </div>
        </Tooltip>
      )}
    </span>
  )
}

export default memo(SocialSharing)
