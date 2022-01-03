import React from 'react'

type Props = {
  [key: string]: any
}

const CategoryTags: React.FC<Props> = ({ categories }: Props) => {
  if (!categories || !categories.length) return <></>

  return (
    <div className="flex flex-wrap space-x-4">
      {categories.map((category: string, key: number) => {
        return (
          <span className="tag" key={key}>{category}</span>
        )
      })}
    </div>
  )
}

export default CategoryTags

