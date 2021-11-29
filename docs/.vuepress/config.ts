import {path} from '@vuepress/utils'
import {AppOptions, DefaultThemeOptions} from "vuepress";

module.exports = <Partial<AppOptions>>{
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Tippy.vue',
      description: 'Documentation for the Tippy.vue library plugin'
    }
  },
  themeConfig: <Partial<DefaultThemeOptions>>{
    repoLabel: 'Contribute!',
    // git repo here... gitlab, github
    repo: 'https://github.com/siegerts/vue-component-library-template',
    docsDir: 'docs',
    docsBranch: 'master',
    search: false,
    locales: {
      '/': {
        repoLabel: 'GitHub'
      }
    },

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: [
              '/guide/v-tippy.md',
              '/guide/tippy.md',
              '/guide/singletons.md',
          ]
        }
      ]
    },

    navbar: [
      { text: 'Getting Started', link: '/guide/' },
    ],
  },
  markdown: {
    code: {
      lineNumbers: false
    }
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, '..'),
        componentsPatterns: ['**/*.vue', '!.vuepress'],
        getComponentName(filename: string): string {
          const prefixes = ['utils']
          let name = filename
          for(let prefix of prefixes) {
            name = name.replace(new RegExp(`^${prefix}/`), '')
          }
          name = name.replace(/[\/\\]/g, '-')
          return path.trimExt(name)
        }
      }
    ],
    'vuepress-plugin-attrs'
  ]
}
