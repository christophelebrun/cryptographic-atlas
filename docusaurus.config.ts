import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'The Cryptographic Atlas',
  tagline:
    'A practical map of modern cryptographic primitives, protocols, guarantees, and design patterns.',
  favicon: 'img/logo-placeholder.svg',

  // TODO: Replace USERNAME before publishing to GitHub Pages.
  url: 'https://USERNAME.github.io',
  baseUrl: '/cryptographic-atlas/',
  organizationName: 'USERNAME',
  projectName: 'cryptographic-atlas',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  trailingSlash: false,

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo-placeholder.svg',
    navbar: {
      title: 'The Cryptographic Atlas',
      logo: {
        alt: 'The Cryptographic Atlas logo',
        src: 'img/logo-placeholder.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'atlasSidebar',
          position: 'left',
          label: 'Book',
        },
        {
          href: 'https://github.com/USERNAME/cryptographic-atlas',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Book',
          items: [
            {
              label: 'Start reading',
              to: '/docs/intro',
            },
            {
              label: 'Taxonomy',
              to: '/docs/taxonomy/overview',
            },
            {
              label: 'Reading list',
              to: '/docs/appendices/reading-list',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'Contributing',
              href: 'https://github.com/USERNAME/cryptographic-atlas/blob/main/CONTRIBUTING.md',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/USERNAME/cryptographic-atlas',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The Cryptographic Atlas contributors. Content is licensed under CC BY-SA 4.0 unless otherwise noted.`,
    },
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
