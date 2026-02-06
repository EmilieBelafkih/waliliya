'use client';

import { useRef, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Image as ShopifyImage } from '@/lib/shopify/types';
import { ShopifyRichText } from '@/components/shared/ShopifyRichText';
import { Link } from 'next-view-transitions';
import { FaArrowRight } from 'react-icons/fa';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RichTextNode = {
  type: string;
  children?: RichTextNode[];
  value?: string;
};

export function SectionTwo({
  image,
  richTextJson,
}: {
  image?: ShopifyImage;
  richTextJson: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { part1Nodes, part2Nodes } = useMemo(() => {
    try {
      const parsed = JSON.parse(richTextJson);

      const nodes: RichTextNode[] = parsed.children || [];

      let headingCount = 0;

      const splitIndex = nodes.findIndex((node) => {
        if (node.type === 'heading') {
          headingCount++;
          return headingCount === 2;
        }
        return false;
      });

      if (splitIndex !== -1) {
        return {
          part1Nodes: nodes.slice(0, splitIndex),
          part2Nodes: nodes.slice(splitIndex),
        };
      }

      return { part1Nodes: nodes, part2Nodes: [] };
    } catch (e) {
      console.error('Error parsing Rich Text', e);
      return { part1Nodes: [], part2Nodes: [] };
    }
  }, [richTextJson]);

  useGSAP(
    () => {
      gsap.fromTo(
        '.anim-text-2',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.anim-text-2', start: 'top 80%' },
        },
      );

      gsap.fromTo(
        '.anim-image-2',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.anim-image-2', start: 'top 80%' },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-16 md:py-24 overflow-visible">
      <div className="max-w-360 mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative">
          {/* LEFT: Content + Buttons */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 anim-text-2 opacity-0">
            {/* --- PART 1: FASHION SECTION --- */}
            <div className="mb-10">
              <ShopifyRichText
                data={{ children: part1Nodes }}
                className="text-lg"
              />

              <div className="mt-6">
                <Link
                  href="/search/toutes-nos-abayas"
                  className="group inline-flex items-center gap-2 text-[#737b4c] font-subtitle font-bold text-sm uppercase tracking-widest hover:text-[#d1fa9d] transition-colors"
                >
                  Voir nos abayas
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {part2Nodes.length > 0 && (
              <div className="mb-8 border-t border-[#b88d6a]/20 pt-10">
                <ShopifyRichText
                  data={{ children: part2Nodes }}
                  className="text-lg"
                />

                <div className="mt-6">
                  <Link
                    href="/search/bien-etre"
                    className="group inline-flex items-center gap-2 text-[#737b4c] font-subtitle font-bold text-sm uppercase tracking-widest hover:text-[#d1fa9d] transition-colors"
                  >
                    Voir l&apos;univers bien-être
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Image (Sticky) */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 anim-image-2 opacity-0 lg:sticky lg:top-32 self-start">
            {image && (
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl shadow-md bg-[#f4f1ed]">
                <Image
                  src={image.url}
                  alt={image.altText || 'Atelier Waliliya'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
