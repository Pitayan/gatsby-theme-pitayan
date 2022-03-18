const path = require("path")

module.exports = {
  mapping: {
    'Mdx.frontmatter.author': `AuthorsYaml`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `AuthorsYaml`,
      }
    },
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        rulePaths: [
          // Rule path refers to
          // https://github.com/gatsbyjs/gatsby/blob/fbfe3f63dec23d279a27b54b4057dd611dce74bb/packages/gatsby/src/utils/eslint-rules/limited-exports-page-templates.ts
          path.join(
            process.cwd(),
            "node_modules/gatsby/dist/utils/eslint-rules"
          ),
        ],
        stages: ["develop"],
        extensions: ["js", "jsx", "ts", "tsx"],
        exclude: ["node_modules", ".cache", "public"],
      },
    },
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
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/authors`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /src\/assets\/img/,
        },
      },
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
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `0`,
              icon: `<span>#</span>`,
              className: `heading-anchor`,
            }
          },
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: `noreferrer`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: `GitHub Dark Dimmed`,
              extensions: [
                path.resolve(
                  `./src/assets/vscode_theme/GitHub.github-vscode-theme-5.0.0.vsix`
                ),
              ],
              inlineCode: {
                marker: `•`,
                theme: {
                  default: `Github Light Default`,
                  parentSelector: {
                    'html[class*="dark"]': `Github Dark Dimmed`,
                  },
                },
                className: `grvsc-inline`,
              },
            },
          },
          { resolve: `gatsby-remark-copy-linked-files` },
        ],
      },
    },
  ],
}
