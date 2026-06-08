import { SITE_URL, absoluteUrl, buildBreadcrumbList, buildSchemaGraph, buildWebPage } from '../seo';

const homeFaq = [
  {
    question: 'Este Zinx Casino legal în România?',
    answer:
      'Da. Zinx Casino este licențiat de ONJN prin Licența Clasa 1 nr. L1254520W001667. Platforma funcționează într-un cadru reglementat, cu conexiuni SSL și jocuri cu RNG certificat.',
  },
  {
    question: 'Ce bonus primesc la înregistrare?',
    answer:
      'La prima depunere primești 100% bonus până la 5.000 RON + 500 rotiri gratuite pentru cazino, sau 100% până la 200 RON pentru pariuri sportive. Rulajul bonusului de cazino este de 35x (depunere + bonus).',
  },
  {
    question: 'Cum retrag banii de la Zinx?',
    answer:
      'Din contul tău, accesezi secțiunea de retrageri, alegi metoda preferată și introduci suma. Retragerea minimă este 50 RON. Contul trebuie verificat înainte de prima retragere.',
  },
  {
    question: 'Zinx funcționează pe mobil?',
    answer:
      'Da, Zinx funcționează direct din browser pe orice dispozitiv — telefon, tabletă sau PC — fără să fie necesară descărcarea unei aplicații. Există și aplicații native pentru iOS și Android.',
  },
];

export function buildHomeSchema() {
  return buildSchemaGraph(
    buildWebPage({
      name: 'Zinx Casino',
      description:
        'Zinx Casino – informații oficiale pentru România despre bonusuri, sloturi, cazino live și pariuri sportive.',
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
