const path = require("path")

module.exports = {
  siteMetadata: {
    title: `Pitayan Blog`,
    name: `Pitayan`,
    description: `Welcome to Pitayan, come find inspiring software development stories.`,
    siteUrl: `https://pitayan.com`,
    siteLinks: [
      {
        name: "sitemap",
        url: "/sitemap.xml",
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
        name: "subscribe",
        url: "/subscribe",
        group: "connect,home",
        internal: true,
      },
      {
        name: "github",
        url: "https://github.com/Pitayan",
        group: "connect",
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
                // Get the first paragraph as content
                const p = node.mdxAST.children.find(c => c.type == "paragraph")
                let partial = ""
                if (p && p.children) {
                  const text = p.children.find(c => c.type == "text" && c.value)
                  if (text) {
                    partial = text.value
                  }
                }

                return Object.assign({}, node.frontmatter, {
                  url: siteUrl + node.fields.slug,
                  guid: siteUrl + node.fields.slug,
                  custom_elements: [
                    {
                      "content:encoded": `
                      <![CDATA[ <p>${partial || node.description}</p> ]]>
                      `,
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
                    mdxAST
                    fields {
                      slug
                    }
                    frontmatter {
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
      resolve: require.resolve(`./plugins/patched-@raae-gatsby-remark-oembed`),
    },
    {
      resolve: `@pitayan/gatsby-theme-pitayan`,
      options: {
        siteAssets: "src/assets",
        postsPerPage: 6,
        mailChimpEndpoint:
          "https://pitayanblog.us14.list-manage.com/subscribe/post?u=234bf6777b76872feb7d92a68&amp;id=27fad95f3b",
        mailChimpTimeout: 3500,
        gatsbyRemarkPluginsHead: [
          {
            resolve: require.resolve(
              `./plugins/patched-@raae-gatsby-remark-oembed`
            ),
            options: {
              usePrefix: ["oembed"],
              providers: {
                exclude: ["Redit"],
              },
            },
          },
          `gatsby-remark-responsive-iframe`,
        ],
      },
    },
  ],
}
