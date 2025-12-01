'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { SmartIcon } from '@/shared/blocks/common';
import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Features as FeaturesType } from '@/shared/types/blocks/landing';

export function FeaturesList({
  features,
  className,
}: {
  features: FeaturesType;
  className?: string;
}) {
  return (
    // Prevent horizontal scrolling
    <section className={`overflow-x-hidden py-16 md:py-24 ${className}`}>
      <div className="container overflow-x-hidden">
        <div className="flex flex-wrap items-center gap-8 pb-12 md:gap-24">
          <ScrollAnimation direction="left">
            <div className="mx-auto w-full max-w-[500px] flex-shrink-0 md:mx-0">
              <Image
                src={features.image?.src ?? ''}
                alt={features.image?.alt ?? ''}
                width={500}
                height={300}
                className="h-auto w-full rounded-lg object-cover"
                // Limit max image width & responsive width
                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </ScrollAnimation>
          <div className="w-full min-w-0 flex-1">
            <ScrollAnimation delay={0.1}>
              <h2 className="text-foreground text-4xl font-semibold text-balance break-words">
                {features.title}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <p className="text-md text-muted-foreground my-6 text-balance break-words">
                {features.description}
              </p>
            </ScrollAnimation>

            {features.buttons && features.buttons.length > 0 && (
              <ScrollAnimation delay={0.3}>
                <div className="flex flex-wrap items-center justify-start gap-2">
                  {features.buttons?.map((button, idx) => (
                    <Button
                      asChild
                      key={idx}
                      variant={button.variant || 'default'}
                      size={button.size || 'default'}
                    >
                      <Link
                        key={idx}
                        href={button.url ?? ''}
                        target={button.target ?? '_self'}
                        className={cn(
                          'focus-visible:ring-ring inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                          'h-9 px-4 py-2',
                          'bg-background ring-foreground/10 hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50 border border-transparent shadow-sm ring-1 shadow-black/15 duration-200'
                        )}
                      >
                        {button.icon && (
                          <SmartIcon name={button.icon as string} size={24} />
                        )}
                        {button.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              </ScrollAnimation>
            )}
          </div>
        </div>

        <ScrollAnimation delay={0.1}>
          {/* Prevent horizontal scrolling, min-w-0 and break-words */}
          <div className="relative grid min-w-0 grid-cols-1 gap-x-3 gap-y-6 border-t pt-12 break-words sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {features.items?.map((item, idx) => (
              <div className="min-w-0 space-y-3 break-words" key={idx}>
                <div className="flex min-w-0 items-center gap-2">
                  {item.icon && (
                    <SmartIcon name={item.icon as string} size={16} />
                  )}
                  <h3 className="min-w-0 text-sm font-medium break-words">
                    {item.title}
                  </h3>
                </div>
                <p className="text-muted-foreground min-w-0 text-sm break-words">
                  {item.description ?? ''}
                </p>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
