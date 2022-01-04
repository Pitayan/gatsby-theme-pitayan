const path = require('path')

module.exports = {
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `styleguide`,
        path: `${__dirname}/content/styleguide`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /src\/assets\/img/
        }
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: `noreferrer`,
            },
          },
          // {
          //   resolve: `gatsby-remark-vscode`,
          //   options: {
          //     theme: `GitHub Dark Dimmed`,
          //     extensions: [path.resolve(`./src/assets/vscode_theme/GitHub.github-vscode-theme-5.0.0.vsix`)],
          //     inlineCode: {
          //       marker: `•`,
          //       theme: {
          //         default: `Github Light Default`,
          //         parentSelector: {
          //           'html[class*="dark"]': `Github Dark Dimmed`,
          //         }
          //       },
          //       className: `grvsc-inline`
          //     },
          //   }
          // },
          { resolve: `gatsby-remark-copy-linked-files` },
        ],
      },
    },
  ],
}
