import { graphql } from "gatsby"
import React from "react"

import DefaultLayout from "@/layouts/Default"
import PostPanel from "@/components/PostPanel"
import Pagination from "@/components/Pagination"

type CategoryPostsProps = {
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

const CategoryPosts: React.FC<CategoryPostsProps> = ({
  data: {
    allMdx: { edges: posts, totalCount, pageInfo },
  },
  pageContext: { category },
}: CategoryPostsProps) => {
  return (
    <DefaultLayout>
      <h1 className="font-bold font-sans leading-tight md:leading-tight md:text-5xl text-4xl">
        Category: {category} ({totalCount})
      </h1>
      <hr className="my-8 border-gray-300" />
      <Posts posts={posts} />
      <div className="my-24">
        <Pagination pageInfo={pageInfo} path={`categories/${category}`} />
      </div>
    </DefaultLayout>
  )
}

export default CategoryPosts

export const pageQuery = graphql`
  query($limit: Int!, $skip: Int!, $category: String!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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
            categories
            date(formatString: "MMMM Do, YYYY")
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
