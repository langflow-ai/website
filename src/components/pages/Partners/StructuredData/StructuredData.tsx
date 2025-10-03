const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Langflow Partner Program",
    "description": "Join the Langflow Partner Program and become a certified AI partner. Get official listing, visibility, and support for your AI solutions. Free to join with no fees.",
    "url": "https://www.langflow.org/partners",
    "mainEntity": {
      "@type": "Program",
      "name": "Langflow Partner Program",
      "description": "A comprehensive partner program for AI developers and companies to become certified Langflow partners",
      "provider": {
        "@type": "Organization",
        "name": "Langflow",
        "url": "https://www.langflow.org",
        "logo": "https://www.langflow.org/images/logo.png",
        "sameAs": [
          "https://github.com/langflow-ai/langflow",
          "https://x.com/langflow_ai",
          "https://discord.com/invite/EqksyE2EX9"
        ]
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free to join with no fees or hidden costs"
      },
      "programType": "Certification Program",
      "category": "AI Development",
      "benefits": [
        "Official listing on langflow.org",
        "Certified Partner badge",
        "Visibility to enterprise buyers",
        "Case studies & spotlights",
        "Free to join"
      ],
      "eligibilityCriteria": [
        "Demonstrated use of Langflow in production or client projects",
        "Ability to provide a detailed case study of your Langflow implementation",
        "Commitment to maintaining high-quality standards in your work",
        "Willingness to participate in partner activities and feedback sessions"
      ],
      "applicationProcess": [
        {
          "@type": "HowToStep",
          "name": "Apply",
          "description": "Submit your application with company details and project description"
        },
        {
          "@type": "HowToStep",
          "name": "Review",
          "description": "Our team reviews your application and Langflow usage within 5-7 business days"
        },
        {
          "@type": "HowToStep",
          "name": "Submit Case Study",
          "description": "Provide one detailed case study showcasing your Langflow implementation"
        },
        {
          "@type": "HowToStep",
          "name": "Get Certified",
          "description": "Receive your official Langflow Certified Partner badge and welcome package"
        },
        {
          "@type": "HowToStep",
          "name": "Get Listed",
          "description": "Your company appears in our official partner directory for maximum visibility"
        }
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.langflow.org"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Partners",
          "item": "https://www.langflow.org/partners"
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;
