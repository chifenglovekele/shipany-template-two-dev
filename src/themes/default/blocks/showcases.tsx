import Image from 'next/image';

import { Link } from '@/core/i18n/navigation';
import { Card, CardContent } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';
import { Showcases as ShowcasesType } from '@/shared/types/blocks/landing';

export function Showcases({
  showcases,
  className,
}: {
  showcases: ShowcasesType;
  className?: string;
}) {
  return (
    <section
      id={showcases.id}
      className={cn('py-24 md:py-36', showcases.className, className)}
    >
      <div className="mx-auto mb-12 text-center">
        {showcases.sr_only_title && (
          <h1 className="sr-only">{showcases.sr_only_title}</h1>
        )}
        <h2 className="mb-6 text-3xl font-bold text-pretty lg:text-4xl">
          {showcases.title}
        </h2>
        <p className="text-muted-foreground mb-4 max-w-xl lg:max-w-none lg:text-lg">
          {showcases.description}
        </p>
      </div>

      <div className="container grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {showcases.items?.map((item, index) => (
          <Link key={index} href={item.url || ''} target={item.target}>
            <Card className="dark:hover:shadow-primary/10 overflow-hidden p-0 transition-all hover:shadow-lg">
              <CardContent className="p-0">
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <Image
                    src={item.image?.src ?? ''}
                    alt={item.image?.alt ?? ''}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="rounded-t-lg object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 line-clamp-1 text-xl font-semibold text-balance">
                    {item.title}
                  </h3>
                  <p
                    className="text-muted-foreground line-clamp-3 text-sm"
                    dangerouslySetInnerHTML={{ __html: item.description ?? '' }}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
