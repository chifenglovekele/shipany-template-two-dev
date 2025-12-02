import { notFound } from 'next/navigation';

import { source } from '@/core/docs/source';

// Force dynamic rendering to avoid build-time data collection issues
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function DocsContentPage(props: {
  params: Promise<{ slug?: string[]; locale?: string }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.locale);

  if (!page) notFound();

  return (
    <div className="p-6">
      <h1>{page.data.title}</h1>
      <p>{page.data.description}</p>
      <div>Docs content temporarily disabled for testing</div>
    </div>
  );
}

// Temporarily disable static generation for debugging
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[]; locale?: string }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.locale);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
