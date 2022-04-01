import React, { memo } from "react"
import { Link, graphql } from "gatsby"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"

import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"

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
}) => {
  const { siteUrl } = useSiteMetadata()

  return (
    <DefaultLayout pageUrl={`${siteUrl}/categories`}>
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
}

export default memo(CategoriesPage)

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
