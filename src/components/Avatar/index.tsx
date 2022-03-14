import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

type Props = {
  [key: string]: any
}

const Avatar: React.FC<Props> = (props: Props) => {
  const { image, initial } = props
  const avatarImage = getImage(image)

  return (
    <>
      {avatarImage ? (
        <GatsbyImage
          className="rounded-full z-0 ring-2 ring-white dark:ring-gray-600 avatar avatar-rounded"
          image={avatarImage}
          alt=""
        />
      ) : (
        <figure
          className="avatar avatar-rounded bg-gray-500 text-white ring ring-white"
          data-initial={initial}
        />
      )}
    </>
  )
}

export default Avatar
