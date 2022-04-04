import { useStaticQuery, graphql } from "gatsby"
import { NavigationLinksData } from "@pitayan/gatsby-theme-pitayan/src/components/NavigationLinksGroup"
import { ImageDataLike } from "gatsby-plugin-image"

type SiteMetaData = {
  description: string
  siteLinks: NavigationLinksData[]
  name: string
  siteUrl: string
  title: string
  cover: {
    publicURL: string
  }
  icon: {
    normal: ImageDataLike | null
    extension: string
    publicURL: string
  }
}

let _siteMetadata = null
export const useSiteMetadata = (): SiteMetaData => {
  if (_siteMetadata) return _siteMetadata

  const { site, icon, cover } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            description
            siteLinks {
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
        cover: file(relativePath: {regex: "/^sitecover\\./i"}) {
          publicURL
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

  _siteMetadata = { ...site.siteMetadata, icon, cover }
  return _siteMetadata
}
