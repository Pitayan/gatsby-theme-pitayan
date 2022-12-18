import React from "react"
import { graphql } from "gatsby"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import Pagination, {
  PageInfo,
} from "@pitayan/gatsby-theme-pitayan/src/components/Pagination"
import PostsGroup, {
  PostNode,
} from "@pitayan/gatsby-theme-pitayan/src/components/PostsGroup"
import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"

type PostsPageProps = {
  data: {
    allMdx: {
      nodes: PostNode[]
      totalCount: number
      pageInfo: PageInfo
    }
  }
}

const PostsPage: React.FC<PostsPageProps> = ({
  data: {
    allMdx: { nodes: posts, totalCount, pageInfo },
  },
}: PostsPageProps) => {
  const { siteUrl } = useSiteMetadata()

  return (
    <DefaultLayout
      pageUrl={`${siteUrl}/posts/${pageInfo.currentPage}`}
      pageTitle="All Posts"
    >
      <h1 className="leading-tight md:leading-tight md:text-4xl text-3xl text-center mb-32">
        All Posts ({totalCount})
      </h1>
      <PostsGroup
        posts={posts}
        className="grid relative grid-cols-1 md:grid-cols-2 gap-8"
      />
      <div className="my-24">
        <Pagination pageInfo={pageInfo} path="posts" />
      </div>
    </DefaultLayout>
  )
}

export default PostsPage

export const PageQuery = graphql`
  query PostsPageQuery($skip: Int!, $limit: Int!) {
    allMdx(
      filter: {
        internal: {
          contentFilePath: { regex: "/content/posts/" }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
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
          date(formatString: "MMMM Do, YYYY")
          categories
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
