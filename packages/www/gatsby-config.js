const path = require("path")
const colors = require("tailwindcss/colors")

module.exports = {
  siteMetadata: {
    title: `Pitayan demo website`,
    name: `Pitayan`,
    siteUrl: `https://pitayan.com`,
    description: `The description for the website`,
  },
  plugins: [
    {
      resolve: `@pitayan/gatsby-theme-pitayan`,
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
      }
    },
  ],
}
