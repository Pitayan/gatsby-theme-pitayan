import React from "react"
import { graphql } from "gatsby"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import Pagination from "@pitayan/gatsby-theme-pitayan/src/components/Pagination"
import AuthorCard from "@pitayan/gatsby-theme-pitayan/src/components/AuthorCard"
import PostsGroup from "@pitayan/gatsby-theme-pitayan/src/components/PostsGroup"

type AuthorPostsProps = {
  [key: string]: any
}

const AuthorPosts: React.FC<AuthorPostsProps> = ({
  data: {
    allMdx: { nodes: posts, pageInfo },
    authorsYaml: { bio, name, initial, avatar, sns },
  },
  pageContext: { authorId },
}) => {
  return (
    <DefaultLayout>
      <AuthorCard
        bio={bio}
        name={name}
        initial={initial}
        avatar={avatar}
        sns={sns}
      />
      <hr className="my-8 border-gray-300" />
      <PostsGroup
        posts={posts}
        className="grid relative grid-cols-1 md:grid-cols-2 gap-8"
      />
      <div className="my-24">
        <Pagination pageInfo={pageInfo} path={`authors/@${authorId}`} />
      </div>
    </DefaultLayout>
  )
}

export default AuthorPosts

export const pageQuery = graphql`
  query($limit: Int!, $skip: Int!, $authorId: String!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { author: { elemMatch: { id: { in: [$authorId] } } } }
      }
      limit: $limit
      skip: $skip
    ) {
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
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          excerpt
        }
      }
    }
    authorsYaml(id: { eq: $authorId }) {
      id
      name
      initial
      bio
      joined
      avatar {
        normal: childImageSharp {
          gatsbyImageData(
            width: 480
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      sns
    }
  }
`
