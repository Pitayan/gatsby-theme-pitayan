import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import CategoryTags from "@pitayan/gatsby-theme-pitayan/src/components/CategoryTags"
import PostMeta from "@pitayan/gatsby-theme-pitayan/src/components/PostMeta"

type Props = {
  post: any
}

const PostPanel: React.FC<Props> = ({ post }: Props) => {
  const image = getImage(post.frontmatter.hero?.normal)
  const {
    frontmatter: { title, excerpt, date, categories },
    timeToRead,
    fields: { slug },
  } = post

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

export default PostPanel
