import {vitePlugin as remix} from '@remix-run/dev'
import {defineConfig} from 'vite'
import {netlifyPlugin} from '@netlify/remix-adapter/plugin'
import tsconfigPaths from 'vite-tsconfig-paths'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import path from 'path'

export default defineConfig({
  plugins: [remix(), netlifyPlugin(), tsconfigPaths(), cssInjectedByJsPlugin()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
  },
})
