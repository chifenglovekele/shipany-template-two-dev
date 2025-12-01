'use client';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { CTA as CTAType } from '@/shared/types/blocks/landing';

export function CTA({ cta, className }: { cta: CTAType; className?: string }) {
  return (
    <section id={cta.id} className={`py-16 md:py-24 ${className}`}>
      <div className="container">
        <div className="text-center">
          <ScrollAnimation>
            <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
              {cta.title}
            </h2>
          </ScrollAnimation>
          <ScrollAnimation delay={0.15}>
            <p
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: cta.description ?? '' }}
            />
          </ScrollAnimation>

          <ScrollAnimation delay={0.3}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {cta.buttons?.map((button, idx) => (
                <Button
                  asChild
                  size={button.size || 'default'}
                  variant={button.variant || 'default'}
                  key={idx}
                >
                  <Link
                    href={button.url || ''}
                    target={button.target || '_self'}
                  >
                    {button.icon && <SmartIcon name={button.icon as string} />}
                    <span>{button.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
