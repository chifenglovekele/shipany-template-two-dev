import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PERMISSIONS, requirePermission } from '@/core/rbac';
import { Header, Main, MainHeader } from '@/shared/blocks/dashboard';
import { Crumb } from '@/shared/types/blocks/common';

// Force dynamic rendering to avoid build-time data collection issues
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Prevent static generation for this dynamic admin page
export async function generateStaticParams() {
  return [];
}

export default async function PostEditPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  // Check if user has permission to edit posts
  await requirePermission({
    code: PERMISSIONS.POSTS_WRITE,
    redirectUrl: '/admin/no-permission',
    locale,
  });

  const t = await getTranslations('admin.posts');

  const crumbs: Crumb[] = [
    { title: t('edit.crumbs.admin'), url: '/admin' },
    { title: t('edit.crumbs.posts'), url: '/admin/posts' },
    { title: t('edit.crumbs.edit'), is_active: true },
  ];

  return (
    <>
      <Header crumbs={crumbs} />
      <Main>
        <MainHeader title={t('edit.title')} />
        <div className="p-6">
          <p>Form temporarily disabled for testing - Post ID: {id}</p>
        </div>
      </Main>
    </>
  );
}
