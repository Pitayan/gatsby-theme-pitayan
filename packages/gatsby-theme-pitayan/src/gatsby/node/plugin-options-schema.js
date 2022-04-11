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
      .description("The embeded form endpoint of your MailChimp account"),
    mailChimpTimeout: Joi.number()
      .integer()
      .min(500)
      .description("The API request timeout of the MailChimp subscription"),
    applyGatsbyRemarkPlugins: Joi.function().arity(1).description(
      `Return your gatsby-plugin-remark plugins via this function. The argument of this function is the built-in plugins settings.`
    ),
  })
}
