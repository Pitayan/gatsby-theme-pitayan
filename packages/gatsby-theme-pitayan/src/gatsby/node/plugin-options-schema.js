module.exports = function pluginOptionsSchema({ Joi }) {
  return Joi.object({
    siteAssets: Joi.string().description(
      "The static assets for the site. e.g. Logo / Cover image"
    ),
    postsPerPage: Joi.number()
      .integer()
      .greater(0)
      .description("How many posts to be displayed in each list page"),
    mailChimpEndpoint: Joi.string()
      .uri()
      .description("The embeded form endpoint for your MailChimp account"),
    mailChimpTimeout: Joi.number()
      .integer()
      .min(500)
      .description("The timeout for the MailChimp subscription API request"),
    gatsbyRemarkPluginsHead: Joi.array().description(
      "The plugins for gatsby-remark-plugins that will be applied before @pitayan/gatsby-theme-pitayan"
    ),
    gatsbyRemarkPluginsTail: Joi.array().description(
      "The plugins for gatsby-remark-plugins that will be applied after @pitayan/gatsby-theme-pitayan"
    ),
  })
}
