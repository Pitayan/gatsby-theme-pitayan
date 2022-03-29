import React, { memo } from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"

import CategoryTags from "@pitayan/gatsby-theme-pitayan/src/components/CategoryTags"
import PostMeta from "@pitayan/gatsby-theme-pitayan/src/components/PostMeta"

export type PostPanelProps = {
  title: string
  excerpt: string
  date: string
  categories: string[]
  hero?: {
    normal: ImageDataLike
  }
  slug: string
  timeToRead: number
}

const PostPanel: React.FC<PostPanelProps> = ({
  title,
  excerpt,
  date,
  categories,
  hero,
  timeToRead,
  slug,
}) => {
  const image = getImage(hero?.normal)

  return (
    <div className="panel">
      <Link to={slug}>
        {image ? (
          <div className="panel-image">
            <GatsbyImage image={image} alt="" />
          </div>
        ) : null}
        <h3>{title}</h3>
      </Link>
      <p className="panel-content">{excerpt}</p>
      <CategoryTags categories={categories} />
      <br />
      <span className="panel-footer">
        <PostMeta timeToRead={timeToRead} date={date} />
      </span>
    </div>
  )
}

export default memo(PostPanel)
