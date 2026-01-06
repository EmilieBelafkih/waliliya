'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Image as ShopifyImage } from '@/lib/shopify/types';
import { ShopifyRichText } from '@/components/shared/ShopifyRichText';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SectionThree({
  image,
  richTextJson,
}: {
  image?: ShopifyImage;
  richTextJson: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.anim-image-3',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.anim-image-3', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.anim-text-3',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.anim-text-3', start: 'top 80%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-16 md:py-24 overflow-visible">
      <div className="max-w-360 mx-auto px-6">
        {/* Layout: Image Left, Text Right (items-start for sticky) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative">
          {/* LEFT: Image (Sticky) */}
          <div className="w-full lg:w-1/2 anim-image-3 opacity-0 lg:sticky lg:top-32 self-start">
            {image && (
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={image.url}
                  alt={image.altText || 'Notre Histoire'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* RIGHT: Rich Text Content (Scrollable) */}
          <div className="w-full lg:w-1/2 anim-text-3 opacity-0">
            <ShopifyRichText data={richTextJson} className="text-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
