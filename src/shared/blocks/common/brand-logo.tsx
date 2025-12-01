import { Link } from '@/core/i18n/navigation';
import { Brand as BrandType } from '@/shared/types/blocks/common';

import { LazyImage } from './lazy-image';

export function BrandLogo({ brand }: { brand: BrandType }) {
  return (
    <Link
      href={brand.url || ''}
      target={brand.target || '_self'}
      className={`flex items-center space-x-2 ${brand.className}`}
    >
      {brand.logo && (
        <LazyImage
          src={brand.logo.src}
          alt={brand.logo.alt || ''}
          className="h-10 w-auto"
        />
      )}
      {brand.title && (
        <span className="text-lg font-medium">{brand.title}</span>
      )}
    </Link>
  );
}
