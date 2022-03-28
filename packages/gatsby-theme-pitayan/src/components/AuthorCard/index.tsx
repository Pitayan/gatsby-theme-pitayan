import { ImageDataLike } from "gatsby-plugin-image"
import React from "react"
import Avatar from "../Avatar"
import SocialGroup from "../SocialGroup"

type AuthorCardProps = {
  bio: string
  name: string
  initial: string
  avatar: {
    normal: ImageDataLike
  }
  sns: any
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  bio,
  name,
  initial,
  avatar: { normal: image },
  sns,
}) => {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-52 w-52" initial={initial} image={image} />
      <br />
      <h2 className="font-bold font-sans leading-tight md:leading-tight md:text-3xl text-2xl">
        {name}
      </h2>
      <p className="w-64 text-center text-xl dark:text-gray-400">{bio}</p>
      <SocialGroup data={sns} />
    </div>
  )
}

export default AuthorCard
