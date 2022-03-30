import { useStaticQuery, graphql } from "gatsby"
import { NavigationLinksData } from "@pitayan/gatsby-theme-pitayan/src/components/NavigationLinksGroup"
import { ImageDataLike } from "gatsby-plugin-image"

type SiteMetaData = {
  description: string
  links: NavigationLinksData[]
  name: string
  siteUrl: string
  title: string
  icon: {
    normal: ImageDataLike | null
    extension: string
    publicURL: string
  }
}

export const useSiteMetadata = (): SiteMetaData => {
  const { site, icon } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            description
            links {
              name
              url
              group
              internal
            }
            name
            siteUrl
            title
          }
        }
        icon: file(relativePath: {regex: "/^sitelogo\\./i"}) {
          normal: childImageSharp {
            gatsbyImageData(
              width: 36
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
          extension
          publicURL
        }
      }
    `
  )

  return { ...site.siteMetadata, icon }
}
