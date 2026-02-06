'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Image as ShopifyImage } from '@/lib/shopify/types';
import { Link } from 'next-view-transitions';
import { FaArrowRight } from 'react-icons/fa';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SectionOne({
  image,
  htmlBody,
}: {
  image?: ShopifyImage;
  htmlBody: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.anim-image',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.anim-image', start: 'top 80%' },
        },
      );

      gsap.fromTo(
        '.anim-text',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.anim-text', start: 'top 80%' },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 max-w-360 mx-auto px-6 overflow-visible"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative">
        <div className="w-full lg:w-1/2 anim-image opacity-0 lg:sticky lg:top-32 self-start">
          {image && (
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl shadow-md">
              <Image
                src={image.url}
                alt={image.altText || 'La Créatrice'}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 anim-text opacity-0">
          <div
            className="prose prose-lg prose-brown font-text text-[#5D4037]/80 leading-relaxed prose-strong:text-[#737b4c]
                        prose-headings:font-title prose-headings:text-[#3E2723] prose-headings:font-normal"
            dangerouslySetInnerHTML={{ __html: htmlBody }}
          />

          <div className="mt-6">
            <Link
              href="/search"
              className="group inline-flex items-center gap-2 text-[#737b4c] font-subtitle font-bold text-sm uppercase tracking-widest hover:text-[#d1fa9d] transition-colors"
            >
              Découvrir nos collections
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
