const React = require("react")

const HeadComponents = [
  // Refers to https://tailwindcss.com/docs/dark-mode
  // This is to set theme color dark via an inline JS to circumvent a flash of color change during page rendering
  <script dangerouslySetInnerHTML={{ __html: `
    (function() {
      if (typeof window == 'undefined') return;
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })()`
  }} />
]

module.exports = function onRenderBody({
  setHeadComponents,
}) {
  setHeadComponents(HeadComponents)
}
