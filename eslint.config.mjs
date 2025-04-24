import { FlatCompat } from "@eslint/eslintrc";
import reactPlugin from "eslint-plugin-react";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        plugins: {
            react: reactPlugin,
        },
        rules: {
            "react/jsx-max-props-per-line": ["error", { maximum: 1 }],
        },
    },
];

export default eslintConfig;
