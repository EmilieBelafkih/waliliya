import { getPage } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import { BottomQuote } from '../../components/shared/About/BottomQuote';
import { SectionOne } from './SectionOne';
import { SectionTwo } from './SectionTwo';

export const metadata = {
  title: 'La Créatrice | Waliliya',
  description: "L'histoire derrière la marque Waliliya.",
};

export default async function CreatorPage() {
  const page = await getPage('la-creatrice');

  if (!page) return notFound();

  const section1Image = page.heroImage?.reference?.image;
  const section1Body = page.body;

  const section2Text = page.secondDescription?.value as string;
  const section2Image = page.portraitImage?.reference?.image;

  const quote = page.quote?.value as string;

  return (
    <div className="min-h-screen pt-32">
      <SectionOne image={section1Image} htmlBody={section1Body} />

      {section2Text && (
        <SectionTwo richTextJson={section2Text} image={section2Image} />
      )}

      <BottomQuote richText={quote} />
    </div>
  );
}
