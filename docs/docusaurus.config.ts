import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import TerserPlugin from 'terser-webpack-plugin';

const config: Config = {
  title: '@oas-typescript',
  tagline:
    'Superpower your development of TypeScript with sets of OpenAPI tools',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://imballinst.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.NODE_ENV === 'production' ? '/oas-typescript/' : '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css'
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '@oas-typescript',
      logo: {
        alt: 'OpenAPI to TypeScript Logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'gettingStartedSidebar',
          position: 'left',
          label: 'Getting Started'
        },
        {
          href: 'https://github.com/imballinst/oas-typescript',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Try Ajitiono. Built with Docusaurus.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    }
  } satisfies Preset.ThemeConfig,

  // @ts-ignore
  plugins: [webpackDocusaurusPlugin]
};

export default config;

// Custom plugins.
// Source: https://github.com/facebook/docusaurus/issues/4765.
function webpackDocusaurusPlugin() {
  return {
    name: 'webpack-docusaurus-plugin',
    configureWebpack(config: any) {
      // Disable cache in CI since it gets evicted too quickly from github actions limits
      const isCI = process.env.CI;
      const cacheOptions = isCI ? { cache: false } : {};

      // Or compress the cache w/ gzip or brotli
      // const cacheOptions = isCI ? { cache: { compression: 'brotli' } } : {};

      // Replace terser with esbuild minify, but only if terser would have been used
      // This still respects the --no-minify flag
      const minimizer = new TerserPlugin({
        minify: TerserPlugin.esbuildMinify
      });
      const minimizers = config.optimization.minimizer?.map((m) =>
        m instanceof TerserPlugin ? minimizer : m
      );

      return {
        mergeStrategy: { 'optimization.minimizer': 'replace' },
        optimization: {
          minimizer: minimizers
        },
        ...cacheOptions
      };
    }
  };
}
