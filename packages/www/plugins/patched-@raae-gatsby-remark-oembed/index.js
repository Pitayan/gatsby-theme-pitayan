const gatsbyRemarkOembed = require("@raae/gatsby-remark-oembed")
const { onPreBootstrap } = require("@raae/gatsby-remark-oembed/gatsby-node")

let i = -1
module.exports = async (...args) => {
  i++
  const { cache, reporter } = args[0]

  // FIXME: This is to make sure the `onPreBootstrap` is called only once.
  // See this ticket here: https://github.com/raae/gatsby-remark-oembed/issues/66
  if (i < 1) {
    reporter.info(`providers not found, now downloading and creating cache of providers`)
    try {
      await onPreBootstrap({ cache, reporter }, args[1])
      providersFetched = true
    } catch(e) {
      reporter.error(e, `providersFetched: ${providersFetched}`)
    }
  }

  return await gatsbyRemarkOembed(...args)
}
