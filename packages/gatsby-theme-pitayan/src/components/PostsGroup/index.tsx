import React from "react"
import PostPanel from "@pitayan/gatsby-theme-pitayan/src/components/PostPanel"
import { ImageDataLike } from "gatsby-plugin-image"

export type PostNode = {
  id: string
  timeToRead: number
  frontmatter: {
    categories: string[]
    date: string
    excerpt: string
    hero: {
      normal: ImageDataLike
    }
    title: string
  }
  fields: {
    slug: string
  }
}

type PostsGridProps = {
  posts: PostNode[]
  className?: string
}

const PostsGroup: React.FC<PostsGridProps> = ({ posts, className }) => {
  return (
    <div className={className}>
      {posts.map(
        ({
          id,
          timeToRead,
          frontmatter: { categories, date, excerpt, hero, title },
          fields: { slug },
        }) => (
          <PostPanel
            key={id}
            title={title}
            excerpt={excerpt}
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

export default PostsGroup
