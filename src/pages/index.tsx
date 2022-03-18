import React from "react"
import { graphql, navigate } from "gatsby"

import DefaultLayout from "@/layouts/Default"
import HomeHero from "@/components/HomeHero"
import HomeActions from "@/components/HomeActions"
import PostPanel from "@/components/PostPanel"

type HomePageProps = {
  data: any
}

type PostsProps = {
  posts: any
}

// TODO: move this component to another dir
const Posts: React.FC<PostsProps> = ({ posts }: PostsProps) => {
  return (
    <div className="grid relative grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map(({ node }: any) => {
        return <PostPanel post={node} key={node.id} />
      })}
    </div>
  )
}

const HomePage: React.FC<HomePageProps> = ({ data }: HomePageProps) => {
  const posts = data.allMdx.edges

  return (
    <DefaultLayout>
      <HomeHero />
      <br />
      <br />
      <HomeActions />
      <hr className="mt-4 mb-12 border-gray-300" />
      <Posts posts={posts} />
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

export const pageQuery = graphql`
  query HomePageQuery {
    allMdx(limit: 12) {
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

export default HomePage
