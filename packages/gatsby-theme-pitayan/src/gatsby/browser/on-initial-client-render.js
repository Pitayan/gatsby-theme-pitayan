// Polyfill smooth scroll
const smoothscroll = require("smoothscroll-polyfill")
const {
  checkIfDarkMode,
  toggleDark,
} = require("@pitayan/gatsby-theme-pitayan/src/utils")

module.exports = function onInitialClientRender() {
  // toggle Dark mode
  toggleDark(checkIfDarkMode())

  // kick off polyfill
  smoothscroll.polyfill()
}
