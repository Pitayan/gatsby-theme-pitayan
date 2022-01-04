import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import DefaultLayout from "@/layouts/Default"
import PostMeta from "@/components/PostMeta"
import SubscriptionPanel from "@/components/SubscriptionPanel"
import RelatedPosts from "@/components/RelatedPosts"
import SocialSharing from "@/components/SocialSharing"
import CategoryTags from "@/components/CategoryTags"

const PostImage: React.FC<{ image: any }> = ({ image }: any) => {
  return image ? <GatsbyImage image={image} alt="" /> : null
}

const Post: React.FC<Record<string, Array<unknown>>> = ({ data }: any) => {
  const {
    mdx: {
      body,
      frontmatter: { title, date, categories, hero },
      timeToRead,
    },
    allMdx: { edges: relatedPosts },
  } = data
  const image = getImage(hero?.medium)

  return (
    <DefaultLayout>
      <div className="max-w-2xl mx-auto mb-24">
        <h1>{title}</h1>
        <PostMeta date={date} timeToRead={timeToRead} />

        <div className="text-2xl mt-8">
          <SocialSharing />
        </div>
      </div>

      <div className="text-center mb-24">
        <PostImage image={image} />
      </div>

      <article className="markdown">
        <MDXProvider>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </article>

      <SubscriptionPanel />

      <hr className="border-gray-300 my-20" />

      <h3 className="text-base font-black font-serif mb-8 text-gray-500">
        Social Sharing
      </h3>
      <div className="text-2xl my-8">
        <SocialSharing />
      </div>

      <h3 className="text-base font-black font-serif mb-8 text-gray-500">
        Categories
      </h3>
      <div className="my-8">
        <CategoryTags categories={categories} />
      </div>

      <h3 className="text-base font-black font-serif mb-8 text-gray-500">
        Related Posts
      </h3>
      <RelatedPosts posts={relatedPosts} />
    </DefaultLayout>
  )
}

// TODO: implement correct related posts query
export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
        categories
        hero {
          medium: childImageSharp {
            gatsbyImageData(
              width: 944
              height: 531
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }

    allMdx {
      edges {
        node {
          id
          timeToRead
          fields {
            slug
          }
          frontmatter {
            title
            date
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

export default Post
