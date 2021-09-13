import React from "react"
import { graphql } from "gatsby"
import DefaultLayout from "@/layouts/Default"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

// import Modal from '@/components/Modal'

type Props = {
  data: any
}

const StyleGuidePost: React.FC<Props> = ({ data }: Props) => {
  const post = data.mdx

  return (
    <DefaultLayout>
      <MDXProvider>
        <MDXRenderer>
          {post.body}
        </MDXRenderer>
      </MDXProvider>
    </DefaultLayout>
  )
}

export const pageQuery = graphql`
  query StyleGuidePostBySlug {
    mdx {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
      }
    }
  }
`

export default StyleGuidePost
