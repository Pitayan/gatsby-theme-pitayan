import React from "react"
import { graphql } from "gatsby"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import PostPanel from "@pitayan/gatsby-theme-pitayan/src/components/PostPanel"
import Pagination from "@pitayan/gatsby-theme-pitayan/src/components/Pagination"

type PostsPageProps = {
  [key: string]: any
}

type PostsProps = {
  posts: any
}

const Posts: React.FC<PostsProps> = ({ posts }: PostsProps) => {
  return (
    <div className="grid relative grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map(({ node }: any) => {
        return <PostPanel post={node} key={node.id} />
      })}
    </div>
  )
}

const PostsPage: React.FC<PostsPageProps> = ({
  data: {
    allMdx: { edges: posts, totalCount, pageInfo },
  },
}: PostsPageProps) => {
  console.log(pageInfo)
  return (
    <DefaultLayout>
      <h1 className="font-bold font-sans leading-tight md:leading-tight md:text-5xl text-4xl">
        All Posts ({totalCount})
      </h1>
      <hr className="my-8 border-gray-300" />
      <Posts posts={posts} />
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
      edges {
        node {
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
            excerpt
          }
        }
      }
    }
  }
`
