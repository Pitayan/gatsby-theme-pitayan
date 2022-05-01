import React from "react"
import { Helmet } from "react-helmet"
import { helmetJsonLdProp } from "react-schemaorg"
import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"
import { siteSchemas } from "./schema"

export type SEOProps = {
  postDescription?: string
  pageImage?: string
  timeToRead?: number
  postTitle?: string
  pageUrl?: string
  pageTitle?: string
  keywords?: string
  authors?: {
    id: string
    name: string
    bio: string
    socialUrls: string[]
  }[]
  date?: string
  noIndex?: boolean
}

const SEO: React.FC<SEOProps> = ({
  pageImage,
  timeToRead,
  postDescription,
  postTitle,
  pageUrl,
  pageTitle,
  keywords,
  date,
  authors,
  noIndex = false,
}) => {
  const {
    description: siteDescription,
    title: siteTitle,
    name,
    siteUrl,
    siteLinks,
    cover: { publicURL: siteCoverPath },
    icon: { publicURL: siteLogoPath },
  } = useSiteMetadata()

  const twitter = siteLinks.find(l => l.name == "twitter")
  const socialUrls = siteLinks.filter(l => !l.internal).map(l => l.url)
  const coverImageUrl = `${siteUrl}${pageImage || siteCoverPath}`
  const description = (postDescription || siteDescription || "").replace(
    /"/g,
    '\\"'
  )
  const title = postTitle || pageTitle || siteTitle || ""
  const url = pageUrl || siteUrl

  return (
    <Helmet
      title={`${name}${title ? " | " + title : ""}`}
      htmlAttributes={{ lang: "en" }}
      script={[
        helmetJsonLdProp(
          siteSchemas({
            siteUrl,
            siteLogoPath,
            name,
            siteTitle,
            description,
            postTitle,
            pageUrl: url,
            coverImageUrl,
            socialUrls,
            keywords,
            dateCreated: date,
            dateModified: date,
            datePublished: date,
            authors,
          })
        ),
      ]}
    >
      <meta name="theme-color" content="#fff" />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={coverImageUrl} />
      <meta name="description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={name} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {twitter && <meta name="twitter:creator" content={twitter.url} />}
      {timeToRead && <meta name="twitter:label1" content="Reading time" />}
      {timeToRead && (
        <meta name="twitter:data1" content={`${timeToRead} min read`} />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={coverImageUrl} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />

      {noIndex && <meta name="robots" content="noindex" />}
    </Helmet>
  )
}

export default SEO
