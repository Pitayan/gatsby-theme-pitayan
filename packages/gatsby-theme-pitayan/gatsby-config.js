require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const path = require("path")
const fs = require("fs")

const defaultGatsbyRemarkPlugins = [
  {
    resolve: `gatsby-remark-smartypants`,
  },
  {
    resolve: `gatsby-remark-numbered-footnotes`,
  },
  {
    resolve: `gatsby-remark-copy-linked-files`,
  },
  {
    resolve: `gatsby-remark-prismjs`,
    options: {
      classPrefix: "language-",
      inlineCodeMarker: "•",
      aliases: {},
      showLineNumbers: false,
      noInlineHighlight: false,
      languageExtensions: [],
      prompt: {
        user: "root",
        host: "localhost",
        global: false,
      },
      escapeEntities: {},
    },
  },
  {
    resolve: `gatsby-remark-images`,
    options: {
      maxWidth: 10000,
      linkImagesToOriginal: false,
      quality: 100,
      withWebp: false,
      showCaptions: true,
      markdownCaptions: false,
    },
  },
  {
    resolve: `gatsby-remark-autolink-headers`,
    options: {
      offsetY: `0`,
      icon: `<span>#</span>`,
      className: `heading-anchor`,
    },
  },
  {
    resolve: `gatsby-remark-external-links`,
    options: {
      target: `_blank`,
      rel: `noreferrer`,
    },
  },
]

module.exports = ({
  siteAssets = "src/assets",
  applyGatsbyRemarkPlugins = () => defaultGatsbyRemarkPlugins,
}) => ({
  mapping: {
    "Mdx.frontmatter.author": `AuthorsYaml`,
  },
  get plugins() {
    const defaultPlugins = [
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-postcss`,
      `gatsby-plugin-react-helmet`,
      `gatsby-remark-images`,
      `gatsby-plugin-catch-links`,
      {
        resolve: `gatsby-transformer-yaml`,
        options: {
          typeName: `AuthorsYaml`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `posts`,
          path: `content/posts`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `authors`,
          path: `content/authors`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `site`,
          path: `content/site`,
        },
      },
    ]

    if (fs.existsSync(siteAssets)) {
      defaultPlugins.push({
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `siteAssets`,
          path: siteAssets,
        },
      })
    }

    if (process.env.DISQUS_SHORTNAME) {
      defaultPlugins.push({
        resolve: `gatsby-plugin-disqus`,
        options: {
          shortname: process.env.DISQUS_SHORTNAME,
        },
      })
    }

    return defaultPlugins.concat({
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: applyGatsbyRemarkPlugins(
          defaultGatsbyRemarkPlugins
        ),
      },
    })
  },
})
