# Antigravity Rules for Portfolio Website

This file defines the coding standards, environment guidelines, and developer workflow for the portfolio website. Refer to this document before making any changes to the project.

## 🛠️ Developer Commands

Use the following commands to run, build, and test the project:

- **Development Server:** `bun run dev`
- **Production Build:** `bun run build`
- **Run Production Server:** `bun run start`
- **Linting:** `bun run lint`

---

## ⚡ Next.js 16 & React 19 Conventions

This project uses **Next.js 16.2.9** and **React 19**. Note that Next.js 16 introduces breaking changes and new APIs that differ from older versions.

### 1. Instant Navigation

For client-side navigations to be instant, you must ensure that Suspense boundaries are placed correctly and routes are validated:

- **Export `unstable_instant`**: Always export `unstable_instant = { prefetch: 'static' }` from routes that should render instantly.
- **Async Params**: In pages that accept dynamic routing parameters, the `params` object is a Promise. Await it asynchronously inside components covered by `<Suspense>` boundaries. Use `.then()` inline inside Suspense for instant rendering:

  ```tsx
  export const unstable_instant = { prefetch: "static" };

  import { Suspense } from "react";

  export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        {params.then(({ slug }) => (
          <PageContent slug={slug} />
        ))}
      </Suspense>
    );
  }
  ```

### 2. Cache Components

- Enable `cacheComponents: true` in `next.config.ts`.
- Use the `'use cache'` directive at the top of functions or components to cache expensive computations or data fetches.
- Keep data fetching functions modular so they can be cached independently of the presentation components.

---

## 🎨 Styling & Design Guidelines (Tailwind CSS v4)

We use **Tailwind CSS v4** for modern, responsive, and high-performance layouts.

- **Directive-based Imports**: Tailwind is imported via `@import "tailwindcss";` in `src/app/globals.css`.
- **Theme Configuration**: Theme overrides and variables are defined inline inside the CSS file using `@theme inline`:
  ```css
  @theme inline {
    --color-primary: #0f172a;
    --font-sans: var(--font-geist-sans);
  }
  ```
- **Rich Aesthetics**: Do not use generic, default colors (pure red, pure blue). Leverage custom, sophisticated HSL palettes, subtle gradients, and dark mode optimizations.
- **Transitions & Micro-animations**:
  - Add hover states on all interactive elements (e.g., cards, buttons) with `transition-all duration-300 ease-in-out`.
  - Ensure hover effects do not cause layout shifts (avoid scale transforms that resize boundaries).
  - Use `cursor-pointer` on all clickable blocks or interactive cards.
- **Typography**: Utilize Geist (`--font-geist-sans`, `--font-geist-mono`) or Google Fonts (e.g., Inter, Outfit, Fira Code).

---

## 🔌 Integrated Skills

You have access to two powerful custom skills on this workspace. Use them to assist in UI design and 3D interactions.

### 1. UI/UX Pro Max Skill

Contains design rules, color palettes, and stack-specific guidelines.

- **Location**: `.agent/skills/ui-ux-pro-max/` and `.agents/skills/ui-ux-pro-max/`
- **How to use**:
  Run the search engine to obtain a tailored design system or stack-specific suggestions:
  ```bash
  python .agent/skills/ui-ux-pro-max/scripts/search.py "<product_type> <keywords>" --design-system
  ```
  Use the generated design rules, typography imports, and color palettes to build components.

### 2. Three.js Skills

Includes standard practices for 3D graphics, loaders, shading, and post-processing.

- **Location**: `C:\Users\dikshant\.gemini\skills/`
- **Sub-skills available**:
  - `threejs-fundamentals` (cameras, renderers, scene setup)
  - `threejs-geometry` (custom shapes, buffer geometries)
  - `threejs-materials` (textures, PBR standard materials)
  - `threejs-lighting` (lights, shadows, helpers)
  - `threejs-animation` (clocks, loops, GSAP integration)
  - `threejs-loaders` (GLTF, OBJ, DRACO compression)
  - `threejs-shaders` (custom GLSL shaders, vertex/fragment uniforms)
  - `threejs-postprocessing` (bloom, depth-of-field, composers)

---

## 🔍 Pre-Delivery Checklist

Before completing any coding task, verify the following:

- [ ] No raw emojis used as icons (always use SVG icons like Lucide, Heroicons, or Simple Icons).
- [ ] Responsive design verified on mobile (375px), tablet (768px), and desktop (1024px+).
- [ ] Sufficient color contrast in both light and dark modes (4.5:1 ratio minimum).
- [ ] Hover and active states are smooth and don't cause content layout shifts.
- [ ] Fast client navigations validated using Next.js 16 instant rules where applicable.
