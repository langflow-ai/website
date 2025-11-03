# Langflow Website

The official website for [Langflow](https://www.langflow.org) - a powerful visual tool to build and deploy AI agents and MCP servers with drag-and-drop simplicity.

## About Langflow

Langflow is a low-code AI application builder that enables developers to create sophisticated AI workflows, agents, and RAG (Retrieval-Augmented Generation) applications without extensive coding. With support for all major LLMs, vector databases, and a growing library of AI tools, Langflow makes AI development accessible to everyone.

## Tech Stack

This website is built with:

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Sanity CMS** - Headless content management system
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animation library
- **Bootstrap** - UI framework
- **Sass** - CSS preprocessor

## Getting Started

### Prerequisites

- Node.js 22.x or higher
- npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd langflow-website
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (if needed):

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries and configurations
├── styles/          # Global styles and Sass files
└── utils/           # Helper functions

public/
├── images/          # Static images
├── svgs/           # SVG icons
├── brandkit/       # Brand assets
└── ...             # Other static files
```

## Content Management

This website uses Sanity CMS for content management. The CMS integration allows for:

- Dynamic content updates
- Blog post management
- Media asset management
- Real-time content preview

## Newsletter sign up

This website includes a subscription form for a newsletter hosted with [kit.com](https://kit.com).

You will need a Kit API key stored in the environment for the subscription form to function correctly.

You can also add a Kit form ID in the environment. This will add the subscriber to a form and capture attribution from UTM tags in the URL. Note: attribution is not captured when the referrer is localhost.

## Key Features

- **Responsive Design** - Optimized for all devices
- **Performance Optimized** - Built with Next.js for optimal loading speeds
- **SEO Friendly** - Proper meta tags and structured data
- **Accessibility** - WCAG compliant design
- **Modern Animations** - Smooth interactions with Framer Motion

## Deployment

The website can be deployed on various platforms:

### Vercel (Recommended)

```bash
npm run build
```

Then deploy to [Vercel](https://vercel.com) for optimal Next.js hosting.

### Other Platforms

The site can also be deployed to:

- Netlify
- AWS
- Google Cloud Platform
- Any platform supporting Node.js

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Learn More

- [Langflow Documentation](https://docs.langflow.org)
- [Langflow GitHub Repository](https://github.com/langflow-ai/langflow)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)

