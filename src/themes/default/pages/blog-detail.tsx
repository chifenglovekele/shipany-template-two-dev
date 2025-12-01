import { Post as PostType } from '@/shared/types/blocks/blog';
import { BlogDetail } from '@/themes/default/blocks';

export default async function BlogDetailPage({
  locale,
  post,
}: {
  locale?: string;
  post: PostType;
}) {
  return <BlogDetail post={post} />;
}
