export default {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    trailingComma: "none",
    semi: false,
    singleQuote: false,
    overrides: [
        {
            files: ["**/*.yml", "**/*.yaml", "**/*.json"],
            options: {
                tabWidth: 2
            }
        }
    ],
    plugins: ["prettier-plugin-organize-imports"]
}
