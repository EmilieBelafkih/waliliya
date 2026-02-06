import { BottomQuote } from '@/components/shared/About/BottomQuote';
import { SectionOne } from '@/components/shared/About/SectionOne';
import { SectionThree } from '@/components/shared/About/SectionThree';
import { SectionTwo } from '@/components/shared/About/SectionTwo';
import { getPage } from '@/lib/shopify';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'À Propos | Waliliya',
  description: "Découvrez l'univers et les valeurs de Waliliya.",
};

export default async function AboutPage() {
  const page = await getPage('a-propos');

  if (!page) return notFound();

  const section1Image = page.heroImage?.reference?.image;
  const section1Body = page.body;

  const section2Text = page.secondDescription?.value as string;
  const section2Image = page.portraitImage?.reference?.image;

  const section3Text = page.thirdDescription?.value as string;
  const section3Image = page.thirdImage?.reference?.image;

  const quote = page.quote?.value as string;

  return (
    <div className="min-h-screen pt-32">
      <SectionOne image={section1Image} htmlBody={section1Body} />

      {section2Text && (
        <SectionTwo richTextJson={section2Text} image={section2Image} />
      )}

      {section3Text && (
        <SectionThree richTextJson={section3Text} image={section3Image} />
      )}

      {quote && <BottomQuote richText={quote} />}
    </div>
  );
}
