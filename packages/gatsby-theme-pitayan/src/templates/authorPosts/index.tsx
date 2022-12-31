import React from "react"
import { graphql } from "gatsby"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import Pagination, {
  PageInfo,
} from "@pitayan/gatsby-theme-pitayan/src/components/Pagination"
import AuthorCard from "@pitayan/gatsby-theme-pitayan/src/components/AuthorCard"
import PostsGroup, {
  PostNode,
} from "@pitayan/gatsby-theme-pitayan/src/components/PostsGroup"
import { Author } from "@pitayan/gatsby-theme-pitayan/src/pages/authors"

import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"

type AuthorPostsProps = {
  data: {
    allMdx: {
      nodes: PostNode[]
      pageInfo: PageInfo
    }
    authorsYaml: Author
  }
  pageContext: {
    authorId: string
  }
}

const AuthorPosts: React.FC<AuthorPostsProps> = ({
  data: {
    allMdx: { nodes: posts, pageInfo },
    authorsYaml: { bio, name, initial, avatar, sns },
  },
  pageContext: { authorId },
}) => {
  const { siteUrl } = useSiteMetadata()

  return (
    <DefaultLayout
      pageUrl={`${siteUrl}/authors/@${authorId}`}
      pageTitle={`Posts of ${name}`}
    >
      <AuthorCard
        className="mb-24 p-8 bg-gray-50 border border-solid border-gray-100 dark:bg-gray-800 dark:border-gray-800 rounded mx-auto max-w-2xl"
        bio={bio}
        name={name}
        initial={initial}
        avatar={avatar}
        sns={sns}
      />
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
  query ($limit: Int!, $skip: Int!, $authorId: String!) {
    allMdx(
      sort: {
        frontmatter: {
          date: DESC
        }
      }
      filter: {
        frontmatter: { author: { elemMatch: { yamlId: { in: [$authorId] } } } }
        internal: {
          contentFilePath: { regex: "/content/posts/" }
        }
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
                formats: [AUTO]
              )
            }
          }
          description
        }
      }
    }
    authorsYaml(yamlId: { eq: $authorId }) {
      id
      yamlId
      name
      initial
      bio
      joined
      avatar {
        normal: childImageSharp {
          gatsbyImageData(
            width: 480
            placeholder: BLURRED
            formats: [AUTO]
          )
        }
      }
      sns
    }
  }
`
