'use client';

import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Logos as LogosType } from '@/shared/types/blocks/landing';

export function Logos({
  logos,
  className,
}: {
  logos: LogosType;
  className?: string;
}) {
  return (
    <section
      id={logos.id}
      className={cn('py-16 md:py-24', logos.className, className)}
    >
      <div className={`mx-auto max-w-5xl px-6`}>
        <ScrollAnimation>
          <p className="text-md text-center font-medium">{logos.title}</p>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
            {logos.items?.map((item, idx) => (
              <img
                key={idx}
                className="h-8 w-fit dark:invert"
                src={item.image?.src ?? ''}
                alt={item.image?.alt ?? ''}
                height="20"
                width="auto"
              />
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
