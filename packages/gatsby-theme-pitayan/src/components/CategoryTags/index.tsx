import React, { memo } from "react"
import { Link } from "gatsby"

type CategoryTagsProps = {
  categories: string[]
}

const CategoryTags: React.FC<CategoryTagsProps> = ({ categories }) => {
  if (!categories || !categories.length) return <></>

  return (
    <div className="flex flex-wrap space-x-4">
      {categories.map((category: string, key: number) => {
        return (
          <Link className="site-tag" key={key} to={`/categories/${category}`}>
            {category}
          </Link>
        )
      })}
    </div>
  )
}

export default memo(CategoryTags)
