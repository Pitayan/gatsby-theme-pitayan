import React, { memo } from "react"
import PostPanel from "@pitayan/gatsby-theme-pitayan/src/components/PostPanel"
import { ImageDataLike } from "gatsby-plugin-image"

export type PostNode = {
  id: string
  timeToRead: number
  frontmatter: {
    categories: string[]
    date: string
    description: string
    hero: {
      normal: ImageDataLike
    }
    title: string
  }
  fields: {
    slug: string
  }
}

type PostsProps = {
  posts: PostNode[]
  className?: string
}

const PostsGroup: React.FC<PostsProps> = ({
  posts,
  className = "",
}) => {
  return (
    <div className={className}>
      {posts.map(
        ({
          id,
          timeToRead,
          frontmatter: { categories, date, description, hero, title },
          fields: { slug },
        }) => (
          <PostPanel
            key={id}
            title={title}
            description={description}
            date={date}
            categories={categories}
            hero={hero}
            slug={slug}
            timeToRead={timeToRead}
          />
        )
      )}
    </div>
  )
}

export default memo(PostsGroup)
