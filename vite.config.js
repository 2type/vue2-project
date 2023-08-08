import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy'
import { createVuePlugin } from 'vite-plugin-vue2';
import envCompatible from 'vite-plugin-env-compatible';
const LessPluginFunctions = require('less-plugin-functions')
var RpxToremPlugin = require('less-plugin-rpxtorem');
import path from 'path';
const PROJECT_PATH = `${path.resolve(__dirname, '.')}/`

// https://vitejs.dev/config/
export default defineConfig({
    // https://vitejs.dev/config/#base
    base: '/',
    plugins: [
        createVuePlugin({
            target: 'esnext',
        }),
        envCompatible(),
        legacy({
            targets: ['defaults', 'ie >= 11', 'chrome 52'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),
    ],
    resolve: {
        alias: [
            {
                find: '@/',
                replacement: PROJECT_PATH,
            },
        ]
    },
    css: {
        preprocessorOptions: {
            less:{
                plugins: [
                    new RpxToremPlugin({
                        width:750,
                    }),
                    new LessPluginFunctions(),
                ]
            },
        },
    },
    // Build Options
    // https://vitejs.dev/config/#build-options
    build: {
        manifest: true,
        rollupOptions: {
            input: (function(){
                const pages = [
                    'single_page',
                    'example',
                ]
                var out = {}
                pages.forEach(function (page) {
                    out[page] = path.resolve(__dirname, "pages/" + page + '/index.js')
                })
                console.log("pages:" ,out)
                return out
            })(),
            output: {
                plugins: [

                ],
            },
        },
    },
});