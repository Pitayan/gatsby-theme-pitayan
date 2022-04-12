import { getImage, ImageDataLike, GatsbyImage } from "gatsby-plugin-image"
import React, { memo } from "react"
import SVG from "react-inlinesvg"

type SiteLogoProps = {
  alt?: string
  className?: string
  icon: {
    normal: ImageDataLike | null
    extension: string
    publicURL: string
  }
}

const SiteLogo: React.FC<SiteLogoProps> = ({
  alt = "",
  className = "",
  icon: { normal, extension, publicURL },
}) => {
  if (!normal || extension == "svg") {
    return <SVG src={publicURL} className={className} title={alt} />
  }

  const image = getImage(normal)

  return (
    <GatsbyImage image={image} className={`site-logo ${className}`} alt={alt} />
  )
}

export default memo(SiteLogo)
