import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import BackToTop from "@pitayan/gatsby-theme-pitayan/src/components/BackToTop"
import ScrollVisibility from "@pitayan/gatsby-theme-pitayan/src/components/ScrollVisibility"

import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"

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

const Site: React.FC<SiteProps> = ({
  data: {
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
  },
  children,
}: any) => {
  const { siteUrl } = useSiteMetadata()

  return (
    <DefaultLayout
      postDescription={description}
      pageUrl={`${siteUrl}${slug}`}
      pageTitle={title}
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
        <div className="max-w-lg md:max-w-2xl mx-auto mb-24">
          <h1 className="text-center">{title}</h1>
        </div>
      )}

      <article className="markdown">
        <MDXProvider components={{}}>
          {children}
        </MDXProvider>
      </article>
    </DefaultLayout>
  )
}

export const pageQuery = graphql`
  query ($slug: String!) {
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
