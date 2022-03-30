import React, { memo } from "react"

type PostMetaProps = {
  timeToRead: number
  date: string
  className?: string
}

const PostMeta: React.FC<PostMetaProps> = ({
  timeToRead,
  date,
  className,
}) => {
  return (
    <span className={`text-gray-500 ${className}`}>
      {date} • {timeToRead} min read
    </span>
  )
}

export default memo(PostMeta)
