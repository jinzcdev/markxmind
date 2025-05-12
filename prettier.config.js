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
        },
        {
            files: ["**/*.html", "**/*.htm"],
            options: {
                printWidth: 120,
                tabWidth: 2,
                bracketSameLine: false
            }
        }
    ],
    plugins: ["prettier-plugin-organize-imports"]
}
