import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PERMISSIONS, requirePermission } from '@/core/rbac';
import { Header, Main, MainHeader } from '@/shared/blocks/dashboard';
import { Button, Crumb } from '@/shared/types/blocks/common';

// Force dynamic rendering to avoid build-time data collection issues
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Prevent static generation for this dynamic admin page
export async function generateStaticParams() {
  return [];
}

export default async function PostsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: number; pageSize?: number }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Check if user has permission to read posts
  await requirePermission({
    code: PERMISSIONS.POSTS_READ,
    redirectUrl: '/admin/no-permission',
    locale,
  });

  const t = await getTranslations('admin.posts');

  const crumbs: Crumb[] = [
    { title: t('list.crumbs.admin'), url: '/admin' },
    { title: t('list.crumbs.posts'), is_active: true },
  ];

  const buttons: Button[] = [
    {
      title: t('list.buttons.add'),
      url: '/admin/posts/add',
      icon: 'Plus',
      variant: 'default',
    },
  ];

  return (
    <>
      <Header crumbs={crumbs} />
      <Main>
        <MainHeader title={t('list.title')} description={t('list.description')} actions={buttons} />
        <div className="p-6">
          <p>Table temporarily disabled for testing</p>
        </div>
      </Main>
    </>
  );
}
