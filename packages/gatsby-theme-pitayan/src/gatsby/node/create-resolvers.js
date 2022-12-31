module.exports = function createResolvers({ createResolvers }) {
  const resolvers = {
    Mdx: {
      // Create related posts
      relatedPosts: {
        type: ["Mdx"],
        resolve: async (source, _, context, __) => {
          const { entries, totalCount } = await context.nodeModel.findAll({
            type: "Mdx",
            query: {
              limit: 3,
              sort: {
                fields: ["frontmatter.date"],
                order: ["DESC"],
              },
              filter: {
                internal: {
                  contentFilePath: {
                    regex: "/content/posts/",
                  },
                },
                id: {
                  ne: source.id,
                },
                frontmatter: {
                  categories: {
                    in: source.frontmatter.categories,
                  },
                },
              },
            },
          })

          if ((await totalCount()) > 0) {
            return entries
          }

          const allPosts = await context.nodeModel.findAll({
            type: "Mdx",
            query: {
              limit: 3,
              sort: {
                fields: ["frontmatter.date"],
                order: ["DESC"],
              },
              filter: {
                internal: {
                  contentFilePath: {
                    regex: "/content/posts/",
                  },
                },
                id: {
                  ne: source.id,
                },
              },
            },
          })

          return allPosts.entries
        },
      },
    },
  }

  createResolvers(resolvers)
}
