import React, { memo } from "react"
import { Link } from "gatsby"

type CategoryTagsProps = {
  categories: string[]
  className?: string
}

const CategoryTags: React.FC<CategoryTagsProps> = ({
  categories,
  className
}) => {
  if (!categories || !categories.length) return <></>

  return (
    <div className={`flex flex-wrap space-x-4 ${className}`}>
      {categories.map((category: string, key: number) => {
        return (
          <Link className="site-tag block" key={key} to={`/categories/${category}`}>
            {category}
          </Link>
        )
      })}
    </div>
  )
}

export default memo(CategoryTags)
