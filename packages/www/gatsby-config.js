const path = require("path")
const colors = require("tailwindcss/colors")

module.exports = {
  siteMetadata: {
    title: `Pitayan Blog`,
    name: `Pitayan`,
    siteUrl: `https://pitayan.com`,
    description: `Welcome to Pitayan, come find inspiring software development stories.`,
    links: [
      {
        name: "sitemap",
        url: "/sitemap",
        group: "site",
        internal: true,
      },
      {
        name: "rss",
        url: "/rss",
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
        group: "follow,home",
        internal: true,
      },
      {
        name: "github",
        url: "https://github.com/Pitayan",
        group: "follow",
        internal: false,
      },
      {
        name: "twitter",
        url: "https://twitter.com/pitayanblog",
        group: "follow,home",
        internal: false,
      },
    ],
  },
  plugins: [
    {
      resolve: `@pitayan/gatsby-theme-pitayan`,
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        siteAssets: "src/assets",
      },
    },
  ],
}
