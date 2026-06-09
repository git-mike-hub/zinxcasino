import { SITE_URL, absoluteUrl, buildBreadcrumbList, buildSchemaGraph, buildWebPage } from '../seo';

const homeFaq = [
  {
    question: 'Zinx casino este de încredere și sigur pentru jucătorii români?',
    answer:
      'Da. Platforma Zinx este licențiată de Oficiul Național pentru Jocuri de Noroc din România sub licența nr. L1254520W001667. Site-ul beneficiază de criptare SSL, iar jocurile sunt certificate de laboratoare specializate în verificarea RNG-ului.',
  },
  {
    question: 'Cazinoul Zinx este disponibil și pe mobil?',
    answer:
      'Da. Zinx casino este optimizat pentru browserele de mobil, dar dispune și de aplicații concepute special pentru iOS și Android. Aplicațiile se descarcă din magazinele oficiale App Store și Google Play.',
  },
  {
    question: 'Verificarea KYC este necesară la Zinx casino?',
    answer:
      'Da. Cazinoul online Zinx verifică identitatea noilor jucătorilor după crearea contului și înainte de efectuarea primei retrageri. De asemenea, derulează verificări suplimentare de identitate la retragerile ulterioare.',
  },
  {
    question: 'Cum devin membru VIP la casino Zinx România?',
    answer:
      'Toți utilizatorii înregistrați pot participa la programul de loialitate. Accesul la beneficiile VIP se acordă în funcție de activitatea și nivelul contului, conform regulilor platformei.',
  },
];

export function buildHomeSchema() {
  return buildSchemaGraph(
    buildWebPage({
      name: 'Zinx Casino',
      description:
        'Cauți sloturi de la furnizori selecți, păcănele populare, live cazino 24/7, bonusuri și promoții speciale? Înregistrează-te și joacă la Zinx casino România.',
      url: absoluteUrl('/'),
    }),
    buildBreadcrumbList([{ name: 'Acasă', path: '/' }]),
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: homeFaq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  );
}
