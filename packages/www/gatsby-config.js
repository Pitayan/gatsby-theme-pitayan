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
    ],
  },
  plugins: [
    {
      resolve: `@pitayan/gatsby-theme-pitayan`,
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        siteAssets: "src/assets",
        mailChimpEndpoint:
          "https://pitayanblog.us14.list-manage.com/subscribe/post?u=234bf6777b76872feb7d92a68&amp;id=27fad95f3b",
        mailChimpTimeout: 3500,
      },
    },
  ],
}
