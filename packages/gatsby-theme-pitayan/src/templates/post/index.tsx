import React, { useState, useRef } from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import { useLocation } from "@reach/router"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import PostMeta from "@pitayan/gatsby-theme-pitayan/src/components/PostMeta"
import AuthorCard from "@pitayan/gatsby-theme-pitayan/src/components/AuthorCard"
import SocialSharing from "@pitayan/gatsby-theme-pitayan/src/components/SocialSharing"
import CategoryTags from "@pitayan/gatsby-theme-pitayan/src/components/CategoryTags"
import BackToTop from "@pitayan/gatsby-theme-pitayan/src/components/BackToTop"
import PostAuthors from "@pitayan/gatsby-theme-pitayan/src/components/PostAuthors"
import SelectionPopup from "@pitayan/gatsby-theme-pitayan/src/components/SelectionPopup"
import ScrollVisibility from "@pitayan/gatsby-theme-pitayan/src/components/ScrollVisibility"
import TableOfContents from "@pitayan/gatsby-theme-pitayan/src/components/TableOfContents"

import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"
import { SOCIAL_RESOURCES } from "@pitayan/gatsby-theme-pitayan/src/constants"
import { Author } from "@pitayan/gatsby-theme-pitayan/src/pages/authors"
import PostsGroup, { PostNode } from "@pitayan/gatsby-theme-pitayan/src/components/PostsGroup"

type PostProps = {
  data: {
    mdx: {
      body: string
      tableOfContents: {
        items: {url: string; title: string}[]
      }
      frontmatter: {
        author: Author[]
        title: string
        date: string
        categories: string[]
        hero: {
          medium: ImageDataLike
        }
        description: string
        keywords: string
      }
      fields: {
        slug: string
      }
      timeToRead: number
      relatedPosts: PostNode[]
    }
  },
  pageContext: {
    previous: {
      title: string
      slug: string
    }
    next: {
      title: string
      slug: string
    }
  }
}

const PostImage: React.FC<{ image: any }> = ({ image }: any) => {
  return image ? (
    <GatsbyImage className="gatsby-resp-image-image" image={image} alt="" />
  ) : null
}

const Post: React.FC<PostProps> = ({
  data: {
    mdx: {
      body,
      tableOfContents,
      frontmatter: {
        author: coAuthors,
        title,
        date,
        categories,
        hero,
        description,
        keywords,
      },
      fields: { slug },
      timeToRead,
      relatedPosts,
    },
  },
  pageContext: {
    tableOfContentsLevels,
    previous,
    next
  },
  children,
}) => {
  const articleRef = useRef<HTMLElement | null>(null)
  const postImage = getImage(hero?.medium)
  const { siteUrl } = useSiteMetadata()
  const { href: url } = useLocation()

  const authors = coAuthors.map(({ id, yamlId, name, bio, sns }) => {
    const socialUrls = sns
      .filter((s: string[]) => s[0] != "mailto" && s[0] != "url")
      .map((s: string[]) => {
        const network = SOCIAL_RESOURCES[s[0]].url
        const profile = s[1]
        return `${network}/${profile}`
      })

    return {
      id,
      yamlId,
      name,
      bio,
      socialUrls,
    }
  })

  return (
    <DefaultLayout
      postDescription={description}
      pageImage={postImage.images.fallback.src}
      pageUrl={`${siteUrl}${slug}`}
      postTitle={title}
      pageTitle={title}
      keywords={keywords}
      date={date}
      timeToRead={timeToRead}
      authors={authors}
    >
      <SelectionPopup ref={articleRef} />

      <div className="hidden md:block">
        <ScrollVisibility className="fixed right-[6%] bottom-[6%] flex flex-col justify-center z-50">
          <BackToTop />
        </ScrollVisibility>
      </div>

      <div className="max-w-lg md:max-w-2xl mx-auto mb-24">
        <h1 className="text-center">{title}</h1>
        <PostMeta className="block mb-4 text-center" date={date} timeToRead={timeToRead} />

        <div className="block sm:flex flex-wrap items-center justify-center sm:justify-between">
          <PostAuthors data={coAuthors} />
          <SocialSharing
            url={url}
            title={title}
            hashtags={categories.join(",")}
            description={description}
            className="space-x-6 text-xl py-4 justify-center"
            twitter
            facebook
            linkedin
            pocket
            copy
          />
        </div>
      </div>

      <div className="text-center mb-24">
        <PostImage image={postImage} />
      </div>

      <div className="lg:grid lg:grid-cols-9 lg:gaps-5">
        <SocialSharing
          url={url}
          title={title}
          hashtags={categories.join(",")}
          description={description}
          className="hidden lg:flex text-xl mt-12 flex-col lg:col-start-1 lg:col-end-3 top-[2rem] sticky self-start max-h-full overflow-y-auto space-y-6"
          twitter
          facebook
          linkedin
          pocket
          copy
        />
        <article className="markdown lg:col-start-3 lg:col-end-8" ref={articleRef}>
          <MDXProvider components={{}}>
            {children}
          </MDXProvider>
        </article>
        <TableOfContents
          className="hidden lg:block lg:col-span-2 mt-12 top-[2rem] sticky self-start text-xs font-semibold mx-auto mb-6 overflow-y-auto max-h-full"
          items={tableOfContents.items}
          ref={articleRef}
          levels={tableOfContentsLevels}
        />
      </div>

      <div className="my-8 max-w-lg md:max-w-2xl mx-auto">
        <div className="block sm:flex flex-wrap items-center justify-center sm:justify-between">
          <CategoryTags className="my-8 justify-center" categories={categories} />
          <SocialSharing
            url={url}
            title={title}
            hashtags={categories.join(",")}
            description={description}
            className="space-x-6 text-xl my-8 justify-center"
            twitter
            facebook
            linkedin
            pocket
            copy
          />
        </div>

        <div className="flex justify-around flex-wrap text-base mt-12 mb-24">
          <div className="p-4 my-4 bg-gray-50 border border-solid border-gray-100 dark:bg-gray-800 dark:border-gray-800 rounded mr-auto w-full md:w-[49%]">
            <Link to={previous.slug} className="site-link my-2 block">
              <div className="flex items-start space-x-2">
                <RiArrowLeftLine className="block h-6 w-6" />
                <span>{previous.title}</span>
              </div>
            </Link>
          </div>
          <div className="p-4 my-4 bg-gray-50 border border-solid border-gray-100 dark:bg-gray-800 dark:border-gray-800 rounded ml-auto w-full md:w-[49%]">
            <Link to={next.slug} className="site-link my-2 block text-right">
              <div className="flex items-start space-x-2 justify-end">
                <span>{next.title}</span>
                <RiArrowRightLine className="block h-6 w-6" />
              </div>
            </Link>
          </div>
        </div>

        <h5 className="text-center mb-12">Written by</h5>
        {coAuthors.map(({ bio, name, initial, avatar, sns, yamlId }) => {
          return (
            <AuthorCard
              className="p-8 mb-4 bg-gray-50 border border-solid border-gray-100 dark:bg-gray-800 dark:border-gray-800 rounded"
              key={yamlId}
              bio={bio}
              name={name}
              initial={initial}
              avatar={avatar}
              sns={sns}
              yamlId={yamlId}
            />
          )
        })}
      </div>

      <div className="my-24 max-w-lg sm:max-w-full mx-auto">
        <h5 className="mb-12 text-center">Related Posts</h5>
        <PostsGroup
          posts={relatedPosts}
          className="grid sm:grid-cols-3 row-auto auto-cols-auto gap-8"
        />
      </div>
    </DefaultLayout>
  )
}

export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      tableOfContents
      frontmatter {
        author {
          id
          yamlId
          name
          initial
          bio
          sns
          avatar {
            normal: childImageSharp {
              gatsbyImageData(
                width: 128
                placeholder: BLURRED
                formats: [AUTO]
              )
            }
          }
        }
        title
        description
        date(formatString: "MMMM Do, YYYY")
        categories
        hero {
          medium: childImageSharp {
            gatsbyImageData(
              width: 944
              height: 531
              placeholder: BLURRED
              formats: [AUTO]
            )
          }
        }
      }
      fields {
        slug
      }
      relatedPosts {
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

export default Post
