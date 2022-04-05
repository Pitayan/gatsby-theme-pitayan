import React, { memo } from "react"
import { graphql, navigate } from "gatsby"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import HomeHero from "@pitayan/gatsby-theme-pitayan/src/components/HomeHero"
import HomeLinks from "@pitayan/gatsby-theme-pitayan/src/components/HomeLinks"
import PostsGroup, {
  PostNode,
} from "@pitayan/gatsby-theme-pitayan/src/components/PostsGroup"

type HomePageProps = {
  data: {
    allMdx: {
      nodes: PostNode[]
    }
  }
}

const HomePage: React.FC<HomePageProps> = ({
  data: {
    allMdx: { nodes: posts },
  },
}) => {
  return (
    <DefaultLayout>
      <HomeHero />
      <br />
      <br />
      <HomeLinks />
      <hr className="mt-4 mb-12 border-gray-300" />
      <PostsGroup
        posts={posts}
        className="grid relative grid-cols-1 md:grid-cols-2 gap-8"
      />
      <div className="text-center my-24">
        <button
          className="font-bold text-xl rounded px-4 py-2 dark:hover:bg-gray-800 hover:bg-gray-200 transition-colors duration-75"
          onClick={() => navigate("/posts")}
        >
          <span className="">See More ...</span>
        </button>
      </div>
    </DefaultLayout>
  )
}

export default memo(HomePage)

export const pageQuery = graphql`
  query HomePageQuery {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      limit: 12
    ) {
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
          description
        }
      }
    }
  }
`
