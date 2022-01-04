import { graphql } from 'gatsby'
import React from 'react'

type Props = {
  [key: string]: any
}

const Categories: React.FC<Props> = (props: Props) => {
  return (
    <div></div>
  )
}

export default Categories

export const pageQuery = graphql`
  query($category: String!) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields{ 
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
