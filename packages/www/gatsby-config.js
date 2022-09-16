const path = require("path")

module.exports = {
  pathPrefix: `/gatsby-theme-pitayan`,
  siteMetadata: {
    title: `Pitayan Blog`,
    name: `Pitayan`,
    description:
      "Pitayan blog is a place publishing contents about web development! All articles are free to read and share.",
    siteUrl: `https://pitayan.github.io`,
    siteSlogan: `Welcome to Pitayan, come find inspiring software development stories.`,
    siteLinks: [
      {
        name: "sitemap",
        url: "/sitemap/sitemap-index.xml",
        group: "site",
        internal: true,
      },
      {
        name: "rss",
        url: "/rss.xml",
        group: "site",
        internal: true,
      },
      {
        name: "write for us",
        url: "/write-for-us",
        group: "site,home",
        internal: true,
      },
      {
        name: "privacy",
        url: "/privacy-policy",
        group: "site",
        internal: true,
      },
      {
        name: "terms",
        url: "/terms-and-conditions",
        group: "site",
        internal: true,
      },
      {
        name: "about",
        url: "/about",
        group: "site,home",
        internal: true,
      },
      {
        name: "github",
        url: "https://github.com/Pitayan",
        group: "connect,home",
        internal: false,
      },
      {
        name: "twitter",
        url: "https://twitter.com/pitayanblog",
        group: "connect,home",
        internal: false,
      },
      {
        name: "email",
        url: "mailto: pitayanblog@gmail.com",
        group: "connect",
        internal: false,
      },
    ],
    siteCookieConsent: {
      title: '',
      description: '',
      readMore: '',
    },
    siteSubscription: {
      title: '',
      description: '',
    },
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: {
                site: {
                  siteMetadata: { siteUrl },
                },
                allMdx,
              },
            }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  url: siteUrl + node.fields.slug,
                  guid: siteUrl + node.fields.slug,
                  custom_elements: [
                    {
                      "content:encoded": node.html,
                    },
                    {
                      tags: node.frontmatter.categories.join(","),
                    },
                    {
                      featuredImage: siteUrl + node.frontmatter.hero.publicURL,
                    },
                  ],
                })
              })
            },
            query: `
              {
                allMdx(
                  filter: { fileAbsolutePath: { regex: "/content/posts/" } }
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  nodes {
                    html
                    mdxAST
                    fields {
                      slug
                    }
                    frontmatter {
                      hero {
                        publicURL
                      }
                      categories
                      date
                      title
                      description
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            match: "^/posts/",
            title: "Pitayan's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `@pitayan/gatsby-theme-pitayan`,
      options: {
        siteAssets: "src/assets",
        postsPerPage: 6,
        mailChimpEndpoint:
          "https://pitayanblog.us14.list-manage.com/subscribe/post?u=234bf6777b76872feb7d92a68&amp;id=27fad95f3b",
        mailChimpTimeout: 3500,
        applyGatsbyRemarkPlugins: defaultPlugins => [
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              usePrefix: ["oembed"],
              providers: {
                exclude: ["Redit"],
              },
            },
          },
          `gatsby-remark-responsive-iframe`,
          ...defaultPlugins,
        ],
      },
    },
  ],
}
