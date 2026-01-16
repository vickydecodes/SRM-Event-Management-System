module.exports = {
    env: {
        browser: true,
        es2022: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "prettier"
    ],
    plugins: ["react"],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        // React 17+ / Vite
        "react/react-in-jsx-scope": "off",

        // Practical rules
        "no-unused-vars": ["warn"],
        "react/prop-types": "off",

        // Style
        "quotes": ["error", "single"],
        "semi": ["error", "always"]
    },
};
