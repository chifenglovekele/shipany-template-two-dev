'use client';

import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { Image as ImageType } from '@/shared/types/blocks/common';
import { Testimonials as TestimonialsType } from '@/shared/types/blocks/landing';

export function Testimonials({
  testimonials,
  className,
}: {
  testimonials: TestimonialsType;
  className?: string;
}) {
  const TestimonialCard = ({
    name,
    role,
    image,
    quote,
  }: {
    name?: string;
    role?: string;
    image?: ImageType;
    quote?: string;
  }) => {
    return (
      <div className="bg-card/25 ring-foreground/[0.07] flex flex-col justify-end gap-6 rounded-(--radius) border border-transparent p-8 ring-1">
        <p className='text-foreground self-end text-balance before:mr-1 before:content-["\201C"] after:ml-1 after:content-["\201D"]'>
          {quote}
        </p>
        <div className="flex items-center gap-3">
          <div className="ring-foreground/10 aspect-square size-9 overflow-hidden rounded-lg border border-transparent shadow-md ring-1 shadow-black/15">
            <img
              src={image?.src ?? ''}
              alt={image?.alt ?? ''}
              className="h-full w-full object-cover"
              width={460}
              height={460}
              loading="lazy"
            />
          </div>
          <h3 className="sr-only">
            {name}, {role}
          </h3>
          <div className="space-y-px">
            <p className="text-sm font-medium">{name} </p>
            <p className="text-muted-foreground text-xs">{role}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id={testimonials.id}
      className={`py-16 md:py-24 ${testimonials.className} ${className}`}
    >
      <div className="container">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center text-balance">
            <h2 className="text-foreground mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
              {testimonials.title}
            </h2>
            <p className="text-muted-foreground mb-6 md:mb-12 lg:mb-16">
              {testimonials.description}
            </p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <div className="border-border/50 relative rounded-(--radius)">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-px lg:*:nth-1:rounded-t-none lg:*:nth-2:rounded-tl-none lg:*:nth-2:rounded-br-none lg:*:nth-3:rounded-l-none lg:*:nth-4:rounded-r-none lg:*:nth-5:rounded-tl-none lg:*:nth-5:rounded-br-none lg:*:nth-6:rounded-b-none">
              {testimonials.items?.map((item, index) => (
                <TestimonialCard key={index} {...item} />
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
