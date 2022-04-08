const gatsbyRemarkOembed = require("@raae/gatsby-remark-oembed")
const { onPreBootstrap } = require('@raae/gatsby-remark-oembed/gatsby-node')

exports.default = async (...args) => {
  const { cache, reporter } = args[0]
  await onPreBootstrap({ cache, reporter }, args[1])

  return gatsbyRemarkOembed(...args)
}
