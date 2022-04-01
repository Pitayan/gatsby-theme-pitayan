import {
  Article,
  WebSite,
  WebPage,
  BreadcrumbList,
  Person,
  Organization,
  Graph,
  ImageObject,
} from "schema-dts"

type SiteSchemasProps = {
  siteUrl: string
  siteLogoPath: string
  name: string
  postTitle: string
  description: string
  siteTitle: string
  pageUrl: string
  coverImageUrl: string
  socialUrls: string[]
  keywords: string
  dateCreated: string
  dateModified: string
  datePublished: string
  authors: {
    id: string
    name: string
    bio: string
    socialUrls: string[]
  }[]
}

export const organizationSchema = ({
  siteUrl,
  siteLogoPath,
  siteTitle,
  socialUrls = [],
}: Pick<
  SiteSchemasProps,
  "siteUrl" | "siteLogoPath" | "siteTitle" | "socialUrls"
>) =>
  <Organization>{
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteTitle,
    url: siteUrl,
    sameAs: socialUrls,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      inLanguage: "en-US",
      url: `${siteUrl}${siteLogoPath}`,
      width: "512",
      height: "512",
      caption: siteTitle,
    },
    image: {
      "@id": `${siteUrl}/#logo`,
    },
  }

export const websiteSchema = ({
  siteUrl,
  name,
  description,
}: Pick<SiteSchemasProps, "siteUrl" | "name" | "description">) =>
  <WebSite>{
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: name,
    description: description,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en-US",
  }

export const breadcrumbsListSchema = ({
  siteUrl,
  postTitle,
  pageUrl,
}: Pick<SiteSchemasProps, "siteUrl" | "postTitle" | "pageUrl">) =>
  <BreadcrumbList>{
    "@type": "BreadcrumbList",
    description: "Breadcrumbs list",
    name: "Breadcrumbs",
    "@id": `${siteUrl}/#breadcrumb`,
    get itemListElement() {
      let list = [
        {
          "@type": "ListItem",
          position: "1",
          item: {
            "@type": "WebPage",
            url: siteUrl,
            name: "Homepage",
          },
        },
      ]

      if (postTitle) {
        list.push({
          "@type": "ListItem",
          position: "2",
          item: {
            "@type": "WebPage",
            url: pageUrl,
            name: postTitle,
          },
        })
      }

      return list
    },
  }

export const webPageSchema = ({
  description,
  pageUrl,
  name,
  siteUrl,
}: Pick<SiteSchemasProps, "description" | "pageUrl" | "name" | "siteUrl">) =>
  <WebPage>{
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    url: pageUrl,
    name: name,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#organization`,
    },
    description: description,
    breadcrumb: {
      "@id": `${siteUrl}/#breadcrumb`,
    },
    inLanguage: "en-US",
  }

export const postPageSchema = ({
  description,
  name,
  siteUrl,
  pageUrl,
  datePublished,
  dateModified,
}: Pick<
  SiteSchemasProps,
  | "description"
  | "pageUrl"
  | "name"
  | "siteUrl"
  | "datePublished"
  | "dateModified"
>) =>
  <WebPage>{
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    url: `${pageUrl}`,
    name: name,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#organization`,
    },
    description: description,
    datePublished: datePublished,
    dateModified: dateModified,
    breadcrumb: {
      "@id": `${siteUrl}/#breadcrumb`,
    },
    inLanguage: "en-US",
  }

export const authorSchema = ({
  siteUrl,
  id,
  name,
  bio,
  socialUrls = [],
}: Pick<SiteSchemasProps, "siteUrl"> & SiteSchemasProps["authors"][0]) =>
  <Person>{
    "@type": "Person",
    "@id": `${siteUrl}/#/schema/${id}`,
    name: name,
    image: {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#personlogo`,
      inLanguage: "en-US",
      caption: name,
    },
    description: bio,
    sameAs: socialUrls,
  }

export const imageSchema = ({
  pageUrl,
  coverImageUrl,
}: Pick<SiteSchemasProps, "pageUrl" | "coverImageUrl">) =>
  <ImageObject>{
    "@type": "ImageObject",
    "@id": `${pageUrl}/#primaryimage`,
    description: "Cover Image",
    url: coverImageUrl,
    width: 1200,
    height: 628,
    inLanguage: "en-US",
  }

export const postSchema = ({
  siteUrl,
  pageUrl,
  postTitle,
  description,
  keywords,
  dateCreated,
  datePublished,
  dateModified,
  authors,
}: Pick<
  SiteSchemasProps,
  | "siteUrl"
  | "pageUrl"
  | "postTitle"
  | "description"
  | "keywords"
  | "dateCreated"
  | "dateModified"
  | "datePublished"
  | "authors"
>) =>
  <Article>{
    "@type": "Article",
    url: siteUrl,
    headline: postTitle,
    description: description,
    keywords: keywords,
    mainEntityOfPage: "True",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    image: {
      "@id": `${pageUrl}/#primaryimage`,
    },
    dateCreated: dateCreated,
    datePublished: datePublished,
    dateModified: dateModified,
    get author() {
      if (authors.length > 1) {
        return authors.map(({ id }) => {
          return { "@id": `${siteUrl}/#/schema/${id}` }
        })
      }

      return { "@id": `${siteUrl}/#/schema/${authors[0].id}` }
    },
  }

export const siteSchemas = ({
  siteUrl,
  siteLogoPath,
  name,
  siteTitle,
  description,
  postTitle,
  pageUrl,
  coverImageUrl,
  socialUrls,
  keywords,
  dateCreated,
  dateModified,
  datePublished,
  authors,
}: SiteSchemasProps) =>
  <Graph>{
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema({
        siteUrl,
        siteLogoPath,
        siteTitle,
        socialUrls,
      }),
      websiteSchema({
        siteUrl,
        name,
        description,
      }),
      breadcrumbsListSchema({
        siteUrl,
        postTitle,
        pageUrl,
      }),
      postTitle
        ? postPageSchema({
            description,
            pageUrl,
            name,
            siteUrl,
            datePublished,
            dateModified,
          })
        : webPageSchema({
            description,
            pageUrl,
            name,
            siteUrl,
          }),
      postTitle &&
        imageSchema({
          pageUrl,
          coverImageUrl,
        }),
      ...[
        postTitle &&
          authors.map(({ id, name, bio, socialUrls }) =>
            authorSchema({
              siteUrl,
              id,
              name,
              bio,
              socialUrls,
            })
          ),
      ],
      postTitle &&
        postSchema({
          siteUrl,
          pageUrl,
          postTitle,
          description,
          keywords,
          dateCreated,
          datePublished,
          dateModified,
          authors,
        }),
    ].filter(d => d),
  }
