# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint linting

## Project Architecture

This is a Next.js 14 website using the App Router for the official Langflow website. The application is built with TypeScript and uses Sanity CMS for content management.

### Key Technologies
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Sanity CMS** for content management (blog posts, events, pages)
- **Styled Components** for CSS-in-JS styling
- **Sass** for additional styling
- **Framer Motion** for animations
- **Bootstrap** for UI components

### Core Directory Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable React components organized by type
  - `pages/` - Page-specific components
  - `ui/` - Generic UI components
  - `external/` - External integrations (PortableText, SocialShare)
  - `icons/` - Large collection of brand/service icons
- `src/lib/` - Utility libraries and configurations
  - `backend/sanity/` - Sanity CMS configuration and queries
  - `types/` - TypeScript type definitions
  - `utils/` - Helper functions for various features
- `src/styles/` - Global styles, Sass variables, and mixins
- `src/hooks/` - Custom React hooks
- `public/` - Static assets including images and SVGs

### Content Management System

The website uses Sanity CMS with the following key files:
- `src/lib/backend/sanity/config.ts` - Sanity client configuration
- `src/lib/backend/sanity/queries.ts` - Data queries
- `src/lib/backend/sanity/client.ts` - Client setup

Environment variables required:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_SANITY_API_TOKEN` (for preview functionality)

### Component Architecture

Components follow a consistent pattern:
- Each component has its own directory with index.ts, Component.tsx, and styles.module.scss
- Heavy use of CSS Modules for styling
- TypeScript interfaces defined in separate types files
- Extensive icon library for various services and brands

### Key Features

1. **Dynamic Content**: Blog posts, events, and pages managed through Sanity CMS
2. **Newsletter Integration**: Kit.com integration for email subscriptions
3. **Social Sharing**: Custom social media sharing components
4. **Responsive Design**: Mobile-first approach with Bootstrap and custom CSS
5. **Performance**: Optimized images and lazy loading
6. **SEO**: Proper meta tags and structured data

### API Routes

- `/api/posts` - Blog post data
- `/api/events` - Event data
- `/api/search` - Search functionality
- `/api/ask` - AI-powered question answering
- `/api/preview` - Content preview functionality
- `/api/newsletter` - Newsletter subscription

### Environment Configuration

Newsletter functionality requires Kit.com API credentials. The website includes proper fallbacks when these are not configured.

### Build and Deployment

The project is optimized for Vercel deployment but can be deployed to any Node.js hosting platform. The build process includes:
- TypeScript compilation
- Next.js optimization
- Static asset processing
- CSS bundling