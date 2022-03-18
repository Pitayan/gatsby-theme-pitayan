import React from "react"
import { SiFacebook, SiLinkedin, SiTwitter, SiPocket } from "react-icons/si"

type SocialSharingProps = {
  [key: string]: any
}

export function objectToGetParams(object: {
  [key: string]: string | number | undefined | null
}): string {
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
}) => {
  return (
    <span className="flex space-x-8 text-gray-500">
      <a
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
      <a
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
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://linkedin.com/shareArticle${objectToGetParams({
          title,
          url,
          mini: "true",
          summary: excerpt,
          source: "pitayan.com",
        })}`}
      >
        <SiLinkedin />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://getpocket.com/save${objectToGetParams({
          title,
          url,
        })}`}
      >
        <SiPocket />
      </a>
    </span>
  )
}

export default SocialSharing
