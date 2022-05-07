import React, { memo } from "react"
import { objectToGetParams } from "@pitayan/gatsby-theme-pitayan/src/utils"
import { SOCIAL_RESOURCES } from "@pitayan/gatsby-theme-pitayan/src/constants"
import URLCopyIconButton from "@pitayan/gatsby-theme-pitayan/src/components/URLCopyIconButton"
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
          <a
            className="site-link"
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/share${objectToGetParams({
              title,
              url,
              hashtags,
            })}`}
          >
            <TwitterIcon />
          </a>
        </Tooltip>
      )}
      {facebook && (
        <Tooltip text="Share to Facebook">
          <a
            className="site-link"
            target="_blank"
            rel="noreferrer"
            href={`https://www.facebook.com/sharer/sharer.php${objectToGetParams({
              title,
              u: url,
              description: description,
              hashtag: hashtags,
            })}`}
          >
            <FacebookIcon />
          </a>
        </Tooltip>
      )}
      {linkedin && (
        <Tooltip text="Share to Linkedin">
          <a
            className="site-link"
            target="_blank"
            rel="noreferrer"
            href={`https://linkedin.com/shareArticle${objectToGetParams({
              title,
              url,
              summary: description,
            })}`}
          >
            <LinkedinIcon />
          </a>
        </Tooltip>
      )}
      {pocket && (
        <Tooltip text="Share to Pocket">
          <a
            className="site-link"
            target="_blank"
            rel="noreferrer"
            href={`https://getpocket.com/save${objectToGetParams({
              title,
              url,
            })}`}
          >
            <PocketIcon />
          </a>
        </Tooltip>
      )}
      {copy && (
        <Tooltip text="Copy URL address">
          <URLCopyIconButton />
        </Tooltip>
      )}
    </span>
  )
}

export default memo(SocialSharing)
