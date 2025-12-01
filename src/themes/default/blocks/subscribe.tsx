'use client';

import { useState } from 'react';
import { Loader2, Mail, SendHorizonal } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import type { Subscribe as SubscribeType } from '@/shared/types/blocks/landing';

export function Subscribe({
  subscribe,
  className,
}: {
  subscribe: SubscribeType;
  className?: string;
}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      return;
    }

    if (!subscribe.submit?.action) {
      return;
    }

    try {
      setLoading(true);
      const resp = await fetch(subscribe.submit.action, {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if (!resp.ok) {
        throw new Error(`request failed with status ${resp.status}`);
      }

      const { code, message, data } = await resp.json();
      if (code !== 0) {
        throw new Error(message);
      }

      setLoading(false);

      if (message) {
        toast.success(message);
      }
    } catch (e: any) {
      setLoading(false);
      toast.error(e.message || 'subscribe failed');
    }
  };

  return (
    <section
      id={subscribe.id}
      className={cn('py-16 md:py-24', subscribe.className, className)}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <ScrollAnimation>
            <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
              {subscribe.title}
            </h2>
          </ScrollAnimation>
          <ScrollAnimation delay={0.15}>
            <p className="mt-4">{subscribe.description}</p>
          </ScrollAnimation>

          <ScrollAnimation delay={0.3}>
            <div className="mx-auto mt-10 max-w-xl overflow-hidden lg:mt-12">
              <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center overflow-hidden rounded-[calc(var(--radius)+0.75rem)] border pr-3 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
                <Mail className="text-caption pointer-events-none absolute inset-y-0 left-5 my-auto size-5" />

                <input
                  placeholder={
                    subscribe.submit?.input?.placeholder || 'Enter your email'
                  }
                  className="h-14 w-full bg-transparent pl-12 focus:outline-none"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={!email}
                  aria-describedby="email-error"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {subscribe.submit?.button && (
                  <div className="md:pr-1.5 lg:pr-0">
                    <Button
                      aria-label="submit"
                      className="rounded-(--radius)"
                      onClick={handleSubscribe}
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <span className="hidden md:block">
                          {subscribe.submit.button.title}
                        </span>
                      )}
                      <SendHorizonal
                        className="relative mx-auto size-5 md:hidden"
                        strokeWidth={2}
                      />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
