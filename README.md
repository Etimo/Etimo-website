# Etimo website

The website is built with [Next.js](https://nextjs.org) and integrated with [Contentful CMS (headless)](https://www.contentful.com) for content management. It leverages [Next.js App Router](https://nextjs.org/docs/app) and [Server-Side Rendering (SSR)](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering). Styled with [Tailwind CSS](https://tailwindcss.com), interactive animations powered by [Framer Motion](https://motion.dev/).

- **Server components** (default): Most UI is rendered on the server. By rendering most components on the server, the site ships less JavaScript to the browser, improving performance and reducing hydration overhead. Components requiring interactivity opt into the browser using the `'use client'` directive.
- **Data fetching**: Content is fetched from [GraphQL Contentful API](https://www.contentful.com/developers/docs/references/graphql/).

## Content management

### Contentful CMS

The website content is managed through Contentful, a headless CMS service. Login credentials are available in Bitwarden. A quick guide of Contentful and the setup can be found in Google Drive.

**Content structure**:

- **Pages**: Each route corresponds to a page in Contentful, fetched by their unique ID
- **Sections**: Pages are composed of different section types that can be mixed and matched
- **Publishing**: Content changes are either in draft or published state
  - Published changes reflect immediately on the live site (may take up to 60 seconds)
  - No local CMS hosting required - fully managed service

**Workflow**:

1. Log into [Contentful](https://www.contentful.com/)
2. Edit or create content
3. Publish when ready - changes go live instantly

## Internationalization (i18n)

The website supports English (default in Contentful) and Swedish as options.

### Auto detection

The project auto-detects the browser language through a middleware that runs on the server and set a cookie in the browser and redirects if necessary. User can toggle language from the navigation menu.

### URL structure

- **English (default)**: `/en/careers`, `/en/about`, `/en/services`
- **Swedish**: `/karriar`, `/om-oss`, `/tjanster`

Swedish routes have no prefix, while English routes are prefixed with `/en/`.

### How it works

**Contentful setup**:

- All content is localized in Contentful with Swedish and English locales
- Navigation links are stored as a separate content type (`navigationLink`) with:
  - `title`: Display name in each language
  - `slug`: URL path (e.g., `/karriar` in Swedish, `/en/careers` in English)
  - `isExternal`: Boolean flag for external links
- Both language versions of a navigation link share the same `sys.id`, enabling automatic route mapping

**Implementation**:

- Navigation links are fetched from Contentful based on the current locale
- A route map is dynamically built by matching Swedish and English links via their `sys.id`
- The language switcher uses this route map to navigate between corresponding pages
- Page content is fetched with the appropriate locale parameter

**Adding new translated pages**:

1. Create the page content in Contentful for both locales
2. Add navigation links for both Swedish and English versions with matching `sys.id`
3. Ensure the English slug includes the `/en/` prefix
4. Create route folders matching the slugs:

```
   app/
   ├── (routes)/
   │   ├── karriar/          # Swedish route
   │   └── en/
   │       └── careers/      # English route
```

5. Both route components fetch the same content ID but with different locale parameters

The project automatically detects the current locale from the URL path. Swedish content is fetched when no locale is specified, and English content is fetched when the URL starts with `/en`.

## SEO

Metadata is generated for every page in both languages and can be customized in `metadata.ts`. The sitemap is automatically created from `sitemap.ts`.

## Getting started

### Prerequisites

- Node.js 20 or higher
- npm, yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables. You can find the required values in the relevant Contentful/Google Analytics item notes in Bitwarden.

### Available scripts

#### Development & build

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Create production build with Turbopack
npm run start    # Start production server
```

#### Code quality

```bash
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## Deployment

The application is deployed on [Netlify](https://app.netlify.com/login), as with all of Etimos products.

Changes pushed to the main branch are automatically deployed.
