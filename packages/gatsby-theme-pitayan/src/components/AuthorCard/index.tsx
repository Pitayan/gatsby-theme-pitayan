import { Link } from "gatsby"
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
  yamlId?: string
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  bio,
  name,
  initial,
  avatar: { normal: image, className: avatarClassName = "h-32 w-32" },
  sns,
  className = "",
  yamlId,
}) => {
  return (
    <div className={`${className} flex flex-wrap space-x-0 sm:space-x-8`}>
      <div className="w-full sm:w-auto text-center">
        <Avatar className={`mb-4 ${avatarClassName}`} initial={initial} image={image} />
      </div>
      <div className="flex flex-col items-stretch justify-between flex-1 text-center sm:text-left">
        <h3 className="leading-tight md:leading-tight">
          {name}
          {yamlId &&
            <Link to={`/authors/@${yamlId}`} className="site-link mx-2">
              <small>@{yamlId}</small>
            </Link>
          }
        </h3>
        <p className="text-base">{bio}</p>
        <SocialGroup className="max-w-lg text-xl my-0" data={sns} />
      </div>
    </div>
  )
}

export default memo(AuthorCard)
