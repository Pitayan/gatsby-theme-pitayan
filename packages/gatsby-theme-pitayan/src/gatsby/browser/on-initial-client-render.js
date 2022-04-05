// Polyfill smooth scroll
const smoothscroll = require("smoothscroll-polyfill")

module.exports = function onInitialClientRender() {
  // kick off polyfill
  smoothscroll.polyfill()
}
