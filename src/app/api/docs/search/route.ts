import { createElement } from 'react';
import { docs } from '@/.source';
import type { I18nConfig } from 'fumadocs-core/i18n';
import { createFromSource } from 'fumadocs-core/search/server';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';

import { source as originalSource } from '@/core/docs/source';

// Helper to adapt fumadocs-mdx source to fumadocs-core format
function adaptSource(source: { files: (() => any[]) | any[] }) {
  const files =
    typeof source.files === 'function' ? source.files() : source.files;
  return { files };
}

// Create a modified i18n config that maps 'zh' to 'en' for Orama
const searchI18n: I18nConfig = {
  defaultLanguage: 'en',
  languages: ['en'], // Only use 'en' for search to avoid Orama language errors
};

// Create a separate source instance for search with only English language
const searchSource = loader({
  baseUrl: '/docs',
  source: adaptSource(docs.toFumadocsSource()),
  i18n: searchI18n,
  icon(icon) {
    if (!icon) {
      return;
    }
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

export const { GET } = createFromSource(searchSource, {
  language: 'english',
});
