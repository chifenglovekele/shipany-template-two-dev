// .source folder will be generated when you run `next dev`
import { createElement } from 'react';
import { docs, pages, posts } from '@/.source';
import type { I18nConfig } from 'fumadocs-core/i18n';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';

export const i18n: I18nConfig = {
  defaultLanguage: 'en',
  languages: ['en', 'zh'],
};

const iconHelper = (icon: string | undefined) => {
  if (!icon || typeof icon !== 'string') {
    // You may set a default icon
    return;
  }
  try {
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  } catch (error) {
    console.warn('Failed to create icon:', icon, error);
    return;
  }
};

// Docs source - temporarily disable icon helper to fix build issues
export const docsSource = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  i18n,
  // icon: iconHelper, // Temporarily disabled
});

// Pages source (using root path)
export const pagesSource = loader({
  baseUrl: '/',
  source: pages.toFumadocsSource(),
  i18n,
  // icon: iconHelper, // Temporarily disabled
});

// Posts source
export const postsSource = loader({
  baseUrl: '/blog',
  source: posts.toFumadocsSource(),
  i18n,
  // icon: iconHelper, // Temporarily disabled
});

// Keep backward compatibility
export const source = docsSource;
