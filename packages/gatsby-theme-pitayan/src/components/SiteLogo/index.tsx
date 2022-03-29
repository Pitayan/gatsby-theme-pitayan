import { getImage, ImageDataLike, GatsbyImage } from "gatsby-plugin-image"
import React, { memo } from "react"

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
  className,
  icon: {
    normal,
    extension,
    publicURL,
  }
}) => {
  if (!normal || extension == 'svg') {
    // FIXME: Inline SVG files
    // Here are some good references:
    // https://codesandbox.io/s/react-dynamic-svg-import-jtqo0?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js
    // https://www.npmjs.com/package/react-inlinesvg
    // https://www.gatsbyjs.com/plugins/gatsby-transformer-inline-svg/
    return <img className={className} src={publicURL} alt={alt} />
  }

  const image = getImage(normal)

  return <GatsbyImage image={image} className={`site-logo ${className}`} alt={alt} />
}

export default memo(SiteLogo)
