import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import DefaultLayout from "@/layouts/Default"
import PostMeta from "@/components/PostMeta"
import SubscriptionPanel from "@/components/SubscriptionPanel"
import RelatedPosts from "@/components/RelatedPosts"
import SocialSharing from "@/components/SocialSharing"
import CategoryTags from "@/components/CategoryTags"
import BackToTop from "@/components/BackToTop"
import PostAuthors from "@/components/PostAuthors"

const PostImage: React.FC<{ image: any }> = ({ image }: any) => {
  return image ? <GatsbyImage image={image} alt="" /> : null
}

const Post: React.FC<Record<string, Array<unknown>>> = ({ data }: any) => {
  const {
    mdx: {
      body,
      frontmatter: { author, title, date, categories, hero },
      timeToRead,
    },
    allYaml: { edges: authors },
    allMdx: { edges: posts },
  } = data
  const postImage = getImage(hero?.medium)

  const relatedAuthors: any = []
  author.split(", ").forEach((a: string) => {
    const relatedAuthor = authors.find(({ node }: any) => node.name == a)

    if (relatedAuthor) {
      relatedAuthors.push(relatedAuthor)
    }
  })

  return (
    <DefaultLayout>
      <BackToTop />

      <div className="max-w-2xl mx-auto mb-24">
        <h1>{title}</h1>

        <div className="flex items-center space-x-4 text-gray-500">
          <PostAuthors data={relatedAuthors} />
          <PostMeta date={date} timeToRead={timeToRead} />
        </div>

        <div className="text-2xl mt-8">
          <SocialSharing />
        </div>
      </div>

      <div className="text-center mb-24">
        <PostImage image={postImage} />
      </div>

      <article className="markdown">
        <MDXProvider components={{}}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </article>

      <SubscriptionPanel />

      <hr className="border-gray-300 my-12" />

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
      <RelatedPosts posts={posts} />
    </DefaultLayout>
  )
}

// TODO: implement correct related posts query
export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      frontmatter {
        author
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

    allYaml {
      edges {
        node {
          id
          bio
          name
          initial
          joined
          avatar {
            normal: childImageSharp {
              gatsbyImageData(
                width: 32
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          sns {
            facebook
            twitter
            github
          }
        }
      }
    }

    allMdx(limit: 3) {
      edges {
        node {
          id
          timeToRead
          fields {
            slug
          }
          frontmatter {
            title
            author
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

export default Post
