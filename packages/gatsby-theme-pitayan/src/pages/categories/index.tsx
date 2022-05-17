import React, { memo } from "react"
import { graphql } from "gatsby"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import CategoryTags from "@pitayan/gatsby-theme-pitayan/src/components/CategoryTags"

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
  const categories = group.map((category: any) => {
    return category.fieldValue
  })

  return (
    <DefaultLayout pageUrl={`${siteUrl}/categories`} pageTitle="Categories">
      <h1 className="font-bold font-sans leading-tight md:leading-tight md:text-3xl text-2xl text-center mb-32">
        Categories ({group.length})
      </h1>
      <CategoryTags className="mx-auto mb-32 max-w-lg justify-center" categories={categories} />
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
