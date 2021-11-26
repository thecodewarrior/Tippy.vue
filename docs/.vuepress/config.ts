import {path} from '@vuepress/utils'
import {AppOptions} from "vuepress";

module.exports = <Partial<AppOptions>>{
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Component Library 🥂',
      description: 'Documentation site for the Vue component library plugin'
    }
  },
  themeConfig: {
    repoLabel: 'Contribute!',
    // git repo here... gitlab, github
    repo: 'https://github.com/siegerts/vue-component-library-template',
    docsDir: 'docs',
    editLinks: true,
    docsBranch: 'master',
    editLinkText: 'Help us improve this page!',
    search: false,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        lastUpdated: 'Last Updated',
        // service worker is configured but will only register in production
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
      }
    },

    sidebar: {
      '/guide': [
        {
          title: 'Thing',
          collapsable: false,
          children: [
              'demo',
              'directive'
          ]
        }
      ]
    },

    navbar: [
      { text: 'Getting Started', link: '/guide' },
      // external link to git repo...again
      {
        text: 'GitHub',
        link: 'https://github.com/siegerts/vue-component-library-template'
      }
    ],
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
    ]
  ]
}
