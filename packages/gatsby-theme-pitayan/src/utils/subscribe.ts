import jsonp from "jsonp"

// Refers to
// https://github.com/manishsaraan/email-validator/blob/master/index.js
const _tester =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
export const validateEmail = (input: string): boolean => {
  if (!input) return false

  const emailParts = input.split("@")

  if (emailParts.length !== 2) return false

  const account = emailParts[0]
  const address = emailParts[1]

  if (account.length > 64) {
    return false
  } else if (address.length > 255) {
    return false
  }

  const domainParts = address.split(".")
  if (
    domainParts.some(function (part) {
      return part.length > 63
    })
  ) {
    return false
  }

  if (!_tester.test(input)) {
    return false
  }

  return true
}

export const jsonpPromise = (url: string, timeout: number = 300) =>
  new Promise((resolve, reject) =>
    jsonp(url, { param: "c", timeout }, (err, data) => {
      if (err) reject(err)
      if (data) resolve(data)
    })
  )

// Refers to
// https://github.com/benjaminhoffman/gatsby-plugin-mailchimp/blob/master/src/index.js
export const subscribeMailChimp = (email: string) => {
  const isEmailValid = validateEmail(email)
  const emailEncoded = encodeURIComponent(email)

  if (!isEmailValid) {
    return Promise.resolve({
      result: "error",
      msg: "The email you entered is not valid.",
    })
  }

  let endpoint = __MAILCHIMP_ENDPOINT__
  const timeout = __MAILCHIMP_TIMEOUT__

  // Generates MC endpoint for our jsonp request. We have to
  // change `/post` to `/post-json` otherwise, MC returns an error
  endpoint = endpoint.replace(/\/post/g, "/post-json")
  const queryParams = `&EMAIL=${emailEncoded}`
  const url = `${endpoint}${queryParams}`

  return jsonpPromise(url, timeout)
}
