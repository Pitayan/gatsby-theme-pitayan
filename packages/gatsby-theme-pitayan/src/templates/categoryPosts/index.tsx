import { graphql } from "gatsby"
import React from "react"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import Pagination, {
  PageInfo,
} from "@pitayan/gatsby-theme-pitayan/src/components/Pagination"
import PostsGroup, {
  PostNode,
} from "@pitayan/gatsby-theme-pitayan/src/components/PostsGroup"

import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"

type CategoryPostsProps = {
  data: {
    allMdx: {
      nodes: PostNode[]
      totalCount: number
      pageInfo: PageInfo
    }
  }
  pageContext: {
    category: string
  }
}

const CategoryPosts: React.FC<CategoryPostsProps> = ({
  data: {
    allMdx: { nodes: posts, totalCount, pageInfo },
  },
  pageContext: { category },
}: CategoryPostsProps) => {
  const { siteUrl } = useSiteMetadata()

  return (
    <DefaultLayout
      pageUrl={`${siteUrl}/categories/${category}`}
      pageTitle={`Category: ${category}`}
    >
      <h1 className="leading-tight md:leading-tight md:text-4xl text-3xl text-center mb-32">
        {category} ({totalCount})
      </h1>
      <PostsGroup
        posts={posts}
        className="grid relative grid-cols-1 md:grid-cols-2 gap-8"
      />
      <div className="my-24">
        <Pagination pageInfo={pageInfo} path={`categories/${category}`} />
      </div>
    </DefaultLayout>
  )
}

export default CategoryPosts

export const pageQuery = graphql`
  query ($limit: Int!, $skip: Int!, $category: String!) {
    allMdx(
      sort: {
        frontmatter: {
          date: DESC
        }
      }
      filter: {
        frontmatter: { categories: { in: [$category] } }
        internal: {
          contentFilePath: { regex: "/content/posts/" }
        }
      }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        pageCount
      }
      nodes {
        id
        timeToRead
        fields {
          slug
        }
        frontmatter {
          title
          categories
          date(formatString: "MMMM Do, YYYY")
          hero {
            normal: childImageSharp {
              gatsbyImageData(
                width: 768
                placeholder: BLURRED
                formats: [AUTO]
              )
            }
          }
          description
        }
      }
    }
  }
`
