# Langflow Use Cases Page - POC Development Prompt

## Project Overview

Build a comprehensive use cases page for Langflow that showcases 68+ templates organized by categories. The page should follow best practices from competitors like n8n, Make.com, Zapier, and Retool while being specifically tailored for Langflow's AI/LLM workflow platform.

## Technical Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **State Management**: React hooks + Context (or Zustand if needed)
- **Icons**: Lucide React or similar
- **Images**: Next.js Image component with optimization

## Page Structure

### 1. Category Index Page (`/use-cases/categories`)

**URL**: `/use-cases/categories`

**Purpose**: Help users discover the right category in 1-2 clicks

**Layout**:
```
Header
├── Page Title: "Use Cases by Category"
├── Subtitle: "Discover AI workflows for every use case"
├── Global Search Bar (full-text search)
└── Filter Chips (Status, Difficulty, Updated)

Category Grid
├── Category Card 1
│   ├── Category Name
│   ├── Template Count Badge
│   ├── 3 Featured Templates (mini-cards)
│   ├── Last Updated Date
│   └── "View Category" CTA
├── Category Card 2...
└── Category Card N...

Sorting Options
├── Popular
├── Most Templates
└── Recently Updated
```

**Features**:
- Responsive grid (1-4 columns based on screen size)
- Hover effects on category cards
- Search with debouncing (300ms)
- Filter state persistence in URL
- Loading skeletons
- Empty states

### 2. Category Detail Page (`/use-cases/category/[slug]`)

**URL**: `/use-cases/category/[slug]`

**Purpose**: Show all templates within a specific category

**Layout**:
```
Hero Section
├── Category Title (H1)
├── Category Description (2-3 lines)
├── Template Count + Local Filters
└── "How to choose?" Help Link

Template Grid
├── Template Card 1
│   ├── Template Title
│   ├── Short Summary
│   ├── Difficulty + Status Chips
│   ├── Builder + Last Updated
│   ├── Flow Thumbnail
│   ├── "Get flow" CTA (primary)
│   └── "View Details" CTA (secondary)
├── Template Card 2...
└── Template Card N...

Sidebar (Optional)
├── Mini-FAQ (2-4 questions)
└── Quick Playbook
```

**Features**:
- Rich template cards with all metadata
- Local filtering (Status, Difficulty, Updated)
- Sorting options (Relevance, Updated, Featured)
- Pagination (12-24 templates per page)
- Modal for "Get flow" with JSON import
- Responsive layout (sidebar collapses on mobile)

## Data Structure

### Mock Data Format

```typescript
// Category type
interface Category {
  slug: string;
  name: string;
  description: string;
  templates_count: number;
  last_updated: string;
  featured_templates: string[];
}

// Template type
interface Template {
  slug: string;
  topic: string;
  summary: string;
  category: string[];
  mapped_use_cases: string[];
  status: 'DONE' | 'IMPROVED' | 'STILL LIMITED' | 'NOT POSSIBLE';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  builder: {
    name: string;
    url?: string;
  };
  updated_at: string;
  example: {
    input: string;
    output: string;
  };
  flow: {
    json_url: string;
    image_url: string;
    version: string;
  };
  comment?: string;
}
```

### Mock Data Generation

Create realistic mock data for:
- 8-10 categories (e.g., "Customer Support", "Content Generation", "Data Analysis", "RAG", "Chatbots", "Automation", "Analytics", "Integration")
- 68+ templates distributed across categories
- Varied difficulty levels and statuses
- Realistic builder names and dates
- Sample input/output examples

## Component Architecture

### Core Components

1. **CategoryCard**
   - Displays category information
   - Shows featured templates
   - Handles click navigation

2. **TemplateCard**
   - Rich template information display
   - Status and difficulty badges
   - CTA buttons with proper actions

3. **SearchBar**
   - Global search functionality
   - Debounced input
   - Clear button

4. **FilterChips**
   - Status, difficulty, date filters
   - Active state management
   - Clear all functionality

5. **TemplateGrid**
   - Responsive grid layout
   - Loading states
   - Empty states

6. **ImportModal**
   - JSON import functionality
   - Copy-to-clipboard
   - Instructions for users

### Layout Components

1. **CategoryIndexLayout**
   - Header with search and filters
   - Category grid
   - Sorting controls

2. **CategoryDetailLayout**
   - Hero section
   - Template grid
   - Optional sidebar

## Styling Guidelines

### Color Scheme
```css
/* Status Colors */
--status-done: #10B981;      /* Green */
--status-improved: #3B82F6;  /* Blue */
--status-limited: #F59E0B;   /* Amber */
--status-not-possible: #6B7280; /* Gray */

/* Difficulty Colors */
--difficulty-beginner: #10B981;    /* Green */
--difficulty-intermediate: #F59E0B; /* Amber */
--difficulty-advanced: #EF4444;    /* Red */

/* Langflow Brand Colors */
--primary: #3B82F6;
--secondary: #1E40AF;
--accent: #F59E0B;
```

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Code**: JetBrains Mono

### Spacing
- Use Tailwind's spacing scale
- Consistent 4px base unit
- Responsive spacing (sm:, md:, lg:)

## Interactive Features

### Search Functionality
- Real-time search with debouncing
- Search across: topic, mapped_use_cases, comment
- Highlight search terms in results
- Search suggestions (optional)

### Filtering System
- Multiple filter types (Status, Difficulty, Date)
- Filter state in URL for sharing
- Clear individual filters
- Clear all filters

### Sorting Options
- Relevance (search-based)
- Recently Updated
- Most Popular (mock data)
- Difficulty (Beginner → Advanced)

### Import Flow
- "Get flow" button
- Modal with JSON content
- Copy-to-clipboard functionality
- Instructions for importing
- Link to Langflow platform

## Responsive Design

### Breakpoints
- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3-4 columns)

### Mobile Optimizations
- Collapsible sidebar
- Touch-friendly buttons
- Swipe gestures (optional)
- Bottom sheet for filters

## Accessibility Requirements

### WCAG AA Compliance
- Proper heading hierarchy (H1, H2, H3)
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Color contrast ratios

### Screen Reader Support
- Semantic HTML structure
- Alt text for images
- Descriptive link text
- Form labels

## Performance Requirements

### Loading States
- Skeleton screens for cards
- Progressive loading
- Lazy loading for images
- Loading spinners for actions

### Optimization
- Image optimization (WebP, lazy loading)
- Code splitting
- Bundle size monitoring
- Core Web Vitals compliance

## Testing Requirements

### Unit Tests
- Component rendering
- User interactions
- State management
- Utility functions

### Integration Tests
- Page navigation
- Search functionality
- Filter interactions
- Import flow

### E2E Tests (Playwright)
- Complete user journey
- Search → Filter → View → Import
- Mobile responsiveness
- Accessibility compliance

## File Structure

```
src/app/use-cases/
├── page.tsx                    # Redirect to categories
├── categories/
│   └── page.tsx               # Category index page
├── category/
│   └── [slug]/
│       └── page.tsx           # Category detail page
└── template/
    └── [slug]/
        └── page.tsx           # Template detail page (future)

src/components/use-cases/
├── CategoryCard.tsx
├── TemplateCard.tsx
├── SearchBar.tsx
├── FilterChips.tsx
├── TemplateGrid.tsx
├── ImportModal.tsx
└── index.ts

src/lib/use-cases/
├── types.ts                   # TypeScript interfaces
├── mock-data.ts              # Mock data generation
├── utils.ts                  # Utility functions
└── constants.ts              # Constants and config

src/hooks/
├── useSearch.ts              # Search functionality
├── useFilters.ts             # Filter management
└── useTemplates.ts           # Template data fetching
```

## API Endpoints (Mock)

### Categories
```typescript
GET /api/use-cases/categories
Response: Category[]

GET /api/use-cases/categories/[slug]
Response: Category
```

### Templates
```typescript
GET /api/use-cases/templates
Query params: category, status, difficulty, search, sort
Response: { templates: Template[], total: number, page: number }

GET /api/use-cases/templates/[slug]
Response: Template
```

## Success Criteria

### Functional Requirements
- ✅ Users can browse categories
- ✅ Users can search templates
- ✅ Users can filter by multiple criteria
- ✅ Users can import templates to Langflow
- ✅ Page is fully responsive
- ✅ All interactions work on mobile

### Performance Requirements
- ✅ Page loads in < 2 seconds
- ✅ Search responds in < 300ms
- ✅ Images load progressively
- ✅ No layout shift during loading

### Accessibility Requirements
- ✅ Screen reader compatible
- ✅ Keyboard navigable
- ✅ Color contrast compliant
- ✅ Semantic HTML structure

## Development Phases

### Phase 1: Foundation (Week 1)
- Set up project structure
- Create mock data
- Build basic components
- Implement category index page

### Phase 2: Core Features (Week 2)
- Build template grid
- Implement search and filtering
- Add category detail page
- Create import modal

### Phase 3: Polish (Week 3)
- Add responsive design
- Implement accessibility features
- Add loading states
- Write tests

### Phase 4: Integration (Week 4)
- Connect to real data
- Add analytics
- Performance optimization
- Final testing

## Deliverables

1. **Working POC** with all core features
2. **Component Library** with reusable components
3. **TypeScript Types** for all data structures
4. **Mock Data** for 68+ templates
5. **Responsive Design** for all screen sizes
6. **Accessibility Compliance** documentation
7. **Performance Metrics** baseline
8. **Testing Suite** with good coverage

## Notes

- Focus on creating a solid foundation that can be extended
- Prioritize user experience over complex features
- Ensure the design aligns with Langflow's brand
- Make it easy to integrate with real data later
- Consider future features like user ratings and reviews

This POC should demonstrate the full vision while being implementable in 2-3 weeks with a small team.

