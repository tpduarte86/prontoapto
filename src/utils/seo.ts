import { Property, PropertyFAQ } from '../types/property';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  schema?: Record<string, any>;
}

export function updateDocumentSEO({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  schema,
}: SEOProps) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = title;

  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Open Graph Title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  // Open Graph Description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  // Open Graph Type
  let ogTypeTag = document.querySelector('meta[property="og:type"]');
  if (ogTypeTag) ogTypeTag.setAttribute('content', ogType);

  // Canonical URL
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://prontoapto.com.br';
  canonicalTag.setAttribute('href', `${baseUrl}${canonicalPath}`);

  // JSON-LD Structured Data
  const existingScript = document.getElementById('json-ld-schema');
  if (existingScript) {
    existingScript.remove();
  }

  if (schema) {
    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}

export function buildPropertySchema(property: Property, canonicalUrl: string) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.name,
    description: property.description,
    url: canonicalUrl,
    datePosted: '2026-01-01',
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.neighborhood,
      addressRegion: property.state,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.latitude,
      longitude: property.longitude,
    },
  };

  if (property.priceFrom) {
    schema.offers = {
      '@type': 'Offer',
      price: property.priceFrom,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
    };
  }

  return schema;
}

export function buildFAQSchema(faqs: PropertyFAQ[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbsSchema(items: { name: string; path: string }[]) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://prontoapto.com.br';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
}
