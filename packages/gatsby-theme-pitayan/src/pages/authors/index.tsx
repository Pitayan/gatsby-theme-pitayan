import { graphql, Link } from "gatsby"
import React, { memo } from "react"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import AuthorCard from "@pitayan/gatsby-theme-pitayan/src/components/AuthorCard"

import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"
import { ImageDataLike } from "gatsby-plugin-image"

export type Author = {
  id: string
  yamlId: string
  name: string
  bio: string
  initial: string
  avatar: {
    normal: ImageDataLike
  }
  sns: [string, string][]
}

type AuthorsProps = {
  [key: string]: any
  data: {
    allAuthorsYaml: {
      nodes: Exclude<Author, "sns">[]
    }
  }
}

const Authors: React.FC<AuthorsProps> = ({
  data: {
    allAuthorsYaml: { nodes: authors },
  },
}) => {
  const { siteUrl } = useSiteMetadata()

  return (
    <DefaultLayout pageUrl={`${siteUrl}/authors`} pageTitle="Authors">
      <h1 className="leading-tight md:leading-tight md:text-4xl text-3xl text-center mb-32">
        Authors ({authors.length})
      </h1>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-32">
        {authors.map(
          ({ name, initial, yamlId, avatar, sns, bio }) => (
            <AuthorCard
              className="p-8 bg-gray-50 border border-solid border-gray-100 dark:bg-gray-800 dark:border-gray-800 rounded"
              key={yamlId}
              bio={bio}
              name={name}
              initial={initial}
              avatar={avatar}
              sns={sns}
              yamlId={yamlId}
            />
          )
        )}
      </div>
    </DefaultLayout>
  )
}

export default memo(Authors)

export const pageQuery = graphql`
  query {
    allAuthorsYaml(limit: 2000) {
      nodes {
        id
        yamlId
        name
        bio
        sns
        initial
        avatar {
          normal: childImageSharp {
            gatsbyImageData(
              width: 480
              placeholder: BLURRED
              formats: [AUTO]
            )
          }
        }
      }
    }
  }
`
