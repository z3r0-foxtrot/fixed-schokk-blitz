# Schokk Blitz Database

A desktop-first, dark-mode, in-universe Schokk Industry information system for Schokk Blitz. Built with Next.js, React, TypeScript, and repository-managed JSON content. Configured for GitHub Pages static export at `https://z3r0-foxtrot.github.io/Schokk-Industry/`.

## What's included

- Corporate-style homepage and database navigation
- Eight content categories: towers, enemies, maps, equipment, lore, mechanics, guides, and updates
- Mock/template records and placeholder SVG artwork
- Global search across record names, IDs, descriptions, tags, abilities, and documentation sections
- Category catalogs with search, sorting, and grid/list views
- Detailed record pages with statistics, upgrade tables, documentation, and related-record links
- Stable category-prefixed record IDs and an ID assignment helper
- Content validation during production builds
- GitHub Pages static-export deployment-ready Next.js project

## Important: sample content

The included records are demonstrations of the database structure, not verified Schokk Blitz game data. Sample statistics, descriptions, abilities, maps, and lore must be replaced or confirmed before presenting them as factual game information. Placeholder SVG images are included so the site has no broken image references.

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

The build runs the record ID assignment helper and content validation before compiling the site.

## Add a record

1. Open the appropriate file under `data/<category>/index.json`.
2. Add a new object with a unique `slug`, `name`, and `description`. You may omit `id`; the helper assigns one.
3. Add image files under `public/images/<category>/`.
4. Reference the image using a path beginning with `/images/`.
5. Run `npm run assign-ids` and `npm run validate`.
6. Commit and push the changes to GitHub.

Example:

```json
{
  "slug": "new-tower",
  "name": "New Tower",
  "classification": "Tower Classification",
  "status": "Verified",
  "description": "Description of the tower.",
  "image": "/images/towers/new-tower.webp",
  "tags": ["Example"],
  "stats": [
    { "label": "Damage", "value": "—" },
    { "label": "Range", "value": "—" }
  ],
  "abilities": [],
  "upgrades": [],
  "relatedRecords": [],
  "lastUpdated": "2026-11-14"
}
```

The `slug` is the permanent URL identifier. Do not change it casually after publishing. The generated record ID is stored in the record and registry; it does not depend on the record's current position or name.

## Images and branding

- Branding: `public/images/branding/`
- Towers: `public/images/towers/`
- Enemies: `public/images/enemies/`
- Maps: `public/images/maps/`
- Equipment: `public/images/equipment/`
- Lore: `public/images/lore/`
- Mechanics: `public/images/mechanics/`
- Guides: `public/images/guides/`
- Updates: `public/images/updates/`

Replace `public/images/branding/logo.svg` to customize the logo artwork. The current header uses a simple database icon as a safe default. Replace the favicon at `public/images/branding/favicon.svg` as needed.

## GitHub Pages deployment

This project is configured for the repository URL `https://z3r0-foxtrot.github.io/Schokk-Industry/`.

1. Upload the **contents of this project folder** to the root of the `Schokk-Industry` repository. Do not upload the ZIP itself as the website source.
2. Push the files to the `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Open the repository's **Actions** tab and wait for `Deploy Schokk Blitz Database to GitHub Pages` to complete.
6. Visit `https://z3r0-foxtrot.github.io/Schokk-Industry/`.

The included workflow builds the static site into `out/` and deploys it to GitHub Pages. Every push to `main` triggers a new deployment. No Vercel project, database, environment variables, authentication, or external CMS is required.

## Current implementation notes

- Desktop is the primary design target. Smaller screens receive a simplified responsive layout.
- The initial search index is generated from local JSON content at build time; suggestions are based on the bundled sample records.
- Public browsing is enabled. There is no user submission or public editing system.
- The initial update section is a website preview record, not an official game patch note.
- The database version in `data/site.json` is a manually maintained content version.
- This project is a first functional visual prototype. Review the layout and content model before expanding the database.
