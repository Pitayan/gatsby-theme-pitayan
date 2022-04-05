
module.exports = function pluginOptionsSchema({ Joi }) {
  return Joi.object({
    siteAssets: Joi.string().description("The static assets for the site. e.g. Logo / Cover image"),
    postsPerPage: Joi.number().greater(6).description("How many posts to be displayed in each list page"),
    mailChimpEndpoint: Joi.string().uri().description("The embeded form endpoint for your MailChimp account"),
    mailChimpTimeout: Joi.number().min(500).description("The timeout for the MailChimp subscription API request")
  })
}
