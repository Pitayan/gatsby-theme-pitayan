import { ImageDataLike } from "gatsby-plugin-image"
import React, { memo } from "react"
import Avatar from "../Avatar"
import SocialGroup from "../SocialGroup"

type AuthorCardProps = {
  avatar: {
    normal: ImageDataLike
    className?: string
  }
  bio: string
  className?: string
  name: string
  initial: string
  sns: any
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  bio,
  name,
  initial,
  avatar: { normal: image, className: avatarClassName = "h-40 w-40" },
  sns,
  className,
}) => {
  return (
    <div className={`text-center ${className}`}>
      <Avatar className={avatarClassName} initial={initial} image={image} />
      <br />
      <br />
      <div className="flex flex-col">
        <h2 className="font-bold font-sans leading-tight md:leading-tight md:text-3xl text-2xl text-center">
          {name}
        </h2>
        <p className="mx-auto w-64 text-center text-xl dark:text-gray-400">
          {bio}
        </p>
        <SocialGroup className="mx-auto" data={sns} />
      </div>
    </div>
  )
}

export default memo(AuthorCard)
