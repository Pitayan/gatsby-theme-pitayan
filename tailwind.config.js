module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{css,tsx,svg}", "./content/**/*.{md,mdx}"],
  theme: {
    fontFamily: {
      sans:
        "'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif",
      serif: "'Merriweather', Georgia, Serif",
      mono: `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
    },
    extend: {
      keyframes: {
        "fade-in-scale": {
          "0%": {
            opacity: "0",
            transform: "scale(0) rotate(270deg)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) rotate(360deg)",
          },
        },
      },
      animation: {
        "fade-in-scale": "fade-in-scale 0.5s ease-in-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
