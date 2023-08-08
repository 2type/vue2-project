import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy'
import { createVuePlugin } from 'vite-plugin-vue2';
import envCompatible from 'vite-plugin-env-compatible';
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
            targets: ['ie >= 11'],
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
        target: 'es2015',
    },
});