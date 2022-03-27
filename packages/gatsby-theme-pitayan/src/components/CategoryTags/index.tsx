import React from "react"
import { Link } from "gatsby"

type Props = {
  [key: string]: any
}

const CategoryTags: React.FC<Props> = ({ categories }: Props) => {
  if (!categories || !categories.length) return <></>

  return (
    <div className="flex flex-wrap space-x-4">
      {categories.map((category: string, key: number) => {
        return (
          <Link className="tag" key={key} to={`/categories/${category}`}>
            {category}
          </Link>
        )
      })}
    </div>
  )
}

export default CategoryTags
