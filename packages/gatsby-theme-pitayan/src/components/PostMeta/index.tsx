import React from "react"

type PostMetaProps = {
  timeToRead: number
  date: string
}

const PostMeta: React.FC<PostMetaProps> = ({ timeToRead, date }) => {
  return (
    <span className="text-gray-500">
      {date} • {timeToRead} min read
    </span>
  )
}

export default PostMeta
