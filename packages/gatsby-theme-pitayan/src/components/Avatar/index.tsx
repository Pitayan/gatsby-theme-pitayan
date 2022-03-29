import React, { memo } from "react"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"

type AvatarProps = {
  image: ImageDataLike
  initial: string
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({ image, initial, className }) => {
  const avatarImage = getImage(image)

  return avatarImage ? (
    <GatsbyImage
      className={`rounded-full z-0 ring-2 ring-white dark:ring-gray-600 avatar avatar-rounded ${className}`}
      image={avatarImage}
      alt=""
    />
  ) : (
    <figure
      className={`avatar avatar-rounded bg-gray-500 text-white ring ring-white ${className}`}
      data-initial={initial}
    />
  )
}

export default memo(Avatar)
