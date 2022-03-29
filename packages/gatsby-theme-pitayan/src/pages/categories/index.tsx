import React from "react"
import { Link, graphql } from "gatsby"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"

type CategoriesGroup = {
  fieldValue: string
  totalCount: number
}

type CategoriesProps = {
  data: {
    allMdx: {
      group: CategoriesGroup[]
    }
  }
}

const CategoriesPage: React.FC<CategoriesProps> = ({
  data: {
    allMdx: { group },
  },
}) => (
  <DefaultLayout>
    <h1 className="font-bold font-sans leading-tight md:leading-tight md:text-3xl text-2xl">
      Categories ({group.length})
    </h1>
    <hr className="my-8 border-gray-300" />
    <ul>
      {group.map((category: any) => (
        <li key={category.fieldValue}>
          <Link
            className="site-link"
            to={`/categories/${category.fieldValue}/`}
          >
            {category.fieldValue} ({category.totalCount})
          </Link>
        </li>
      ))}
    </ul>
  </DefaultLayout>
)

export default CategoriesPage

export const pageQuery = graphql`
  query {
    allMdx(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
      totalCount
    }
  }
`
