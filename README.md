
# MEDTOOLS Creator Hub

Static documentation website for MEDTOOLS Creator Department SOPs.

## Features
- **Markdown-driven**: Content is sourced from `content/*.md` files.

- **Static Export**: Zero-JS runtime requirement for hosting (compatible with GitHub Pages, Vercel, Netlify).

- **Light Blue Aesthetics**: Clean, professional design using Medtools Blue palette (#3B82F6) and soft gradients.

- **Responsive Design**: Mobile-friendly navigation and layout.

- **KPI Scorecards**: Visual representation of monthly targets.
- **Social Embeds**: Inline examples from Instagram, TikTok, and YouTube.
- **PDF Ready**: Optimized print styles for saving as PDF.

## Tech Stack
- Next.js 15 (App Router)
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Project Structure
```
web/
├── app/                # Application routes and layouts
├── components/         # React components (Navbar, KPI, Embeds)
├── config/             # Single Source of Truth for Platforms
├── content/            # Markdown Source Files (SOPs)
├── data/               # Site metadata
├── lib/                # Utilities (KPI extraction, Markdown parsing)
└── public/             # Static assets
```

## How to Update Content

1. **Edit SOPs**: Modify the `.md` files in `web/content/`.
   - Ensure the `Frontmatter` (at the top of the file) is preserved.
   - Use standard Markdown. Sections under headers will be automatically wrapped in tables.
   - **KPIs**: KPIs are automatically extracted from the "KPI Index" table in each Markdown file.
2. **Add Platforms**:
   - Add the new `.md` file to `web/content/`.
   - Update `web/config/platforms.json` to include the new platform in `navigation` and `platforms` arrays.
3. **Rebuild**: Run `npm run build` to generate the updated static site.

## Development & Build

### Prerequisites
- Node.js 18+

### Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build static site (Output to `out/`)
npm run build
```

## Deployment

The `out/` directory contains the purely static files.
- **Vercel**: Connect repository and set Framework Preset to Next.js.
- **Netlify**: Drag and drop `out` folder or connect repo.
- **GitHub Pages**: Push `out` folder content to `gh-pages` branch.

## PDF Generation

To generate a PDF of a platform SOP:
1. Navigate to the platform page.
2. Click the Floating Print Button (bottom right).
3. Select "Save as PDF" in the print dialog.
   - *Note: The layout is optimized to remove navigational elements during printing.*
