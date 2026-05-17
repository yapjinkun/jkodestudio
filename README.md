# JKODE Studio — static site

Pre-rendered HTML/CSS/JS. **No build step, no React, no Babel.** Open `index.html` in any browser, or drop the folder onto any static host.

## What's in here

```
static/
├── index.html                    ← all markup, pre-rendered
├── site.css                      ← styles
├── site.js                       ← theme toggle + mobile menu (~60 lines)
└── design-system/
    └── colors_and_type.css       ← design tokens (imported by site.css)
```

Total payload: ~30 KB uncompressed. One HTML, one CSS chain (2 files), one JS.

## Deploy

Drop the folder onto any of these — zero config:

- **Vercel / Netlify** — drag the folder into the dashboard, or `vercel deploy ./static`
- **Cloudflare Pages** — connect repo or upload via wrangler
- **GitHub Pages** — push the contents of `static/` to a `gh-pages` branch
- **Amazon S3 + CloudFront** — `aws s3 sync ./static s3://your-bucket --delete`
- **Plain Nginx / Caddy** — point document root at the folder

It's pure static — no server-side anything. No Node, no PHP, no env vars.

## Editing content

Edit `index.html` directly. The HTML is hand-readable and well-commented (`<!-- ───── Services ───── -->` etc.). No templating, no preprocessor — what you see is what gets served.

If you want a templated workflow later, the original React-component version is in the parent project; this static build is a snapshot of that.

## Editing styles

`site.css` extends design tokens from `design-system/colors_and_type.css`. Tweak tokens centrally there (accent color, type scale, spacing) and everything cascades.

## Theme

Light is default. The toggle in the topbar flips to dark. Preference persists to localStorage as `jkode-theme`, and an inline `<script>` in `<head>` restores it before paint to prevent flash.

## Responsive breakpoints

| Width | Change |
|---|---|
| ≥480px | Hero buttons stop expanding to fill |
| ≥640px | "Start a project" CTA appears in topbar |
| ≥720px | Service / approach grids switch to multi-column |
| ≥768px | Section padding expands; type bumps up |
| ≥900px | Desktop nav replaces hamburger |

## Performance notes

- **No JS framework** — initial paint is HTML + CSS only.
- **Theme-flash blocker** in `<head>` reads localStorage before first paint.
- **`site.js` is deferred** — doesn't block parsing.
- **Fonts via `@import` from Google Fonts** inside `colors_and_type.css`. For a stricter perf budget, self-host the Geist / JetBrains Mono / Instrument Serif WOFF2 files and update the @font-face block.
- **No tracking, analytics, or third-party scripts.** Add what you want.

## License

The code's yours. The JKODE design system tokens belong to JKODE Studio.
