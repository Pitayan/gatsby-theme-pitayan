import React from 'react'

const PostMeta: React.FC<Record<string, Array<unknown>>> = (props: any) => {
  const { timeToRead, date } = props

  return (
    <span>
      {date} • {timeToRead} min read
    </span>
  )
}

export default PostMeta
