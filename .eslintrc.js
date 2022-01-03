module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
  ],
  rules: {
    "react/prop-types": "off",
    // Overwrite rules specified from the extended configs e.g.
    // "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings: {
    "import/resolver": {
      typescript: { project: "./" }
    }
  }
}
