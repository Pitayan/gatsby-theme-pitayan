import React from "react"
import { SiFacebook, SiLinkedin, SiTwitter, SiPocket } from "react-icons/si"

type SocialSharingProps = {
  title: string
  url: string
  hashtags: string
  excerpt: string
  className: string
  twitter: string
  facebook: string
  linkedin: string
  pocket: string
}

export function objectToGetParams(
  object: Record<string, string | number | undefined | null>
): string {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
  return params.length > 0 ? `?${params.join("&")}` : ""
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
