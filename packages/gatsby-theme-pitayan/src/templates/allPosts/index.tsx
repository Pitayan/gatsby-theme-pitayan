import React from "react"
import { graphql } from "gatsby"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import Pagination from "@pitayan/gatsby-theme-pitayan/src/components/Pagination"
import PostsGroup from "@pitayan/gatsby-theme-pitayan/src/components/PostsGroup"
import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"

type PostsPageProps = {
  [key: string]: any
}

const PostsPage: React.FC<PostsPageProps> = ({
  data: {
    allMdx: { nodes: posts, totalCount, pageInfo },
  },
}: PostsPageProps) => {
  const { siteUrl } = useSiteMetadata()

  return (
    <DefaultLayout pageUrl={`${siteUrl}/posts/${pageInfo.currentPage}`}>
      <h1 className="font-bold font-sans leading-tight md:leading-tight md:text-3xl text-2xl">
        All Posts ({totalCount})
      </h1>
      <hr className="my-8 border-gray-300" />
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
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
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
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          description
        }
      }
    }
  }
`
