import React from "react"
import { Link, graphql } from "gatsby"

import DefaultLayout from "@/layouts/Default"

type Props = {
  [key: string]: any
}

const CategoriesPage: React.FC<Props> = ({
  data: {
    allMdx: { group },
  },
}: any) => (
  <DefaultLayout>
    <h1 className="font-bold font-sans leading-tight md:leading-tight md:text-5xl text-4xl">
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
