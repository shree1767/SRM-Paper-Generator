module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:import/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "./configs/**",
            group: "internal",
          },
          {
            pattern: "./utils/**",
            group: "internal",
          },
        ],
        "newlines-between": "always",
      },
    ],
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "prefer-const": "error",
    "arrow-spacing": ["error", { before: true, after: true }],
    "prefer-destructuring": "error",
    "no-unused-vars": "error",
    "no-multiple-empty-lines": "error",
    "no-dupe-args": "error",
    "no-dupe-else-if": "error",
    "no-duplicate-imports": "error",
    "no-irregular-whitespace": "error",
    "no-use-before-define": "error",
  },
};
