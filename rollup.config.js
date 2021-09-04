import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import { terser } from "rollup-plugin-terser";
import ts from "rollup-plugin-ts";
import rollupExternalModules from "rollup-external-modules";
import json from "@rollup/plugin-json";
const terserplugin = terser({
    compress: {
        ecma: 2015,
        toplevel: true,
        unused: true,

        drop_debugger: true,
    },
    module: true,
    mangle: false,
    output: { comments: false, beautify: true },
});
const banner = `#!/usr/bin/env node`;
const plugins = [resolve(), commonjs(), ts(), json(), terserplugin];
export default defineConfig([
    {
        external: rollupExternalModules,
        input: "./lib/cli.ts",
        plugins,
        output: {
            banner,
            sourcemap: true,
            file: "./dist/cli.js",
            format: "esm",
        },
    },  {
        external: rollupExternalModules,
        input: "./lib/index.ts",
        plugins,
        output: {
            // banner,
            sourcemap: true,
            file: "./dist/index.js",
            format: "esm",
        },
    },
]);
