module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "prettier"
  ],
  rules: {
    // Safety
    "no-console": "off",          // backend logs are fine
    "no-unused-vars": ["warn"],

    // Style
    "quotes": ["error", "single"],
    "semi": ["error", "always"],

    // Practical backend rules
    "no-throw-literal": "error",
    "eqeqeq": ["error", "always"],
  },
};
