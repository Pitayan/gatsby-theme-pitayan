import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import BackToTop from "@pitayan/gatsby-theme-pitayan/src/components/BackToTop"
import ScrollVisibility from "@pitayan/gatsby-theme-pitayan/src/components/ScrollVisibility"

import {
  useScrollToFragment,
  useSiteMetadata,
} from "@pitayan/gatsby-theme-pitayan/src/hooks"

type SiteProps = {
  data: {
    mdx: {
      body: string
      frontmatter: {
        title: string
        date: string
        description: string
        keywords: string
        displayTitle: boolean
        noIndex: boolean
      }
      fields: {
        slug: string
      }
    }
  }
}

const Site: React.FC<SiteProps> = ({ data }: any) => {
  const {
    mdx: {
      body,
      frontmatter: {
        title,
        date,
        description,
        keywords,
        displayTitle,
        noIndex,
      },
      fields: { slug },
    },
  } = data
  const { siteUrl } = useSiteMetadata()

  useScrollToFragment()

  return (
    <DefaultLayout
      postDescription={description}
      pageUrl={`${siteUrl}${slug}`}
      keywords={keywords}
      date={date}
      noIndex={noIndex}
    >
      <div className="hidden md:block">
        <ScrollVisibility className="fixed right-[6%] bottom-[6%] flex flex-col justify-center z-50">
          <BackToTop />
        </ScrollVisibility>
      </div>

      {displayTitle && (
        <div className="max-w-lg mx-auto mb-10">
          <h1>{title}</h1>
        </div>
      )}

      <article className="markdown">
        <MDXProvider components={{}}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </article>
    </DefaultLayout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        description
        date
        displayTitle
        noIndex
      }
      fields {
        slug
      }
    }
  }
`

export default Site
