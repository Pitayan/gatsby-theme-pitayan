import React from "react"
import { SiFacebook, SiLinkedin, SiTwitter, SiPocket } from "react-icons/si"
import { objectToGetParams } from "@pitayan/gatsby-theme-pitayan/src/utils"

type SocialSharingProps = {
  title: string
  url: string
  hashtags: string
  excerpt: string
  className?: string
  twitter: boolean
  facebook: boolean
  linkedin: boolean
  pocket: boolean
}

const SocialSharing: React.FC<SocialSharingProps> = ({
  title,
  url,
  hashtags,
  excerpt,
  className,
  twitter,
  facebook,
  linkedin,
  pocket,
}) => {
  return (
    <span className={`flex ${className}`}>
      {twitter && (
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
          <SiTwitter />
        </a>
      )}
      {facebook && (
        <a
          className="site-link"
          target="_blank"
          rel="noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php${objectToGetParams({
            title,
            u: url,
            description: excerpt,
            hashtag: hashtags,
          })}`}
        >
          <SiFacebook />
        </a>
      )}
      {linkedin && (
        <a
          className="site-link"
          target="_blank"
          rel="noreferrer"
          href={`https://linkedin.com/shareArticle${objectToGetParams({
            title,
            url,
            summary: excerpt,
          })}`}
        >
          <SiLinkedin />
        </a>
      )}
      {pocket && (
        <a
          className="site-link"
          target="_blank"
          rel="noreferrer"
          href={`https://getpocket.com/save${objectToGetParams({
            title,
            url,
          })}`}
        >
          <SiPocket />
        </a>
      )}
    </span>
  )
}

export default SocialSharing
