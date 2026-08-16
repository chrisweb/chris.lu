# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Source code for chris.lu — a personal blog (tutorials + about-me pages) built with Next.js (App Router), rendered static-first and deployed on Vercel. Content is written as MDX files that live directly inside `app/` as routes; there is no CMS and no separate content directory.

## Commands

* `npm run dev` — dev server (Turbopack)
* `npm run build` — runs lint first, then `next build --turbopack`
* `npm run lint` / `npm run lint-fix` — ESLint over code AND `.mdx` content (cached in `.next/cache/eslint/`); `lint-nocache` when the cache misbehaves
* `npm run check-urls` — dead-link check for MDX content (run sporadically, not part of the build)

There is no test suite. Node >= 20.11.0 required.

## Dev server

When I give you tasks always assume you are in the development environment. Do never assume or try to access preview or production.

The dev server is always running in another terminal. Do not attempt to start or shut it down yourself.

If you need logs or access to the dev server ask the user.

### Stopping Next.js fully on Windows

`npm run dev` starts a process *tree*, not one process: the `npm.cmd` wrapper → `node_modules/.bin/next dev` → `node_modules/next/dist/server/lib/start-server.js` → one or more Turbopack pool workers (`.next/dev/build/chunks/pool_entry-[turbopack-node]…`). Ctrl-C in the terminal, or stopping the background task, kills only the wrapper — the rest survive as orphans and keep holding port 3000, which makes the next start fail or silently attach to a stale server.

Kill the whole tree by matching the command line, then always verify the port is actually free:

```powershell
Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" |
    Where-Object { $_.CommandLine -like '*start-server*' -or $_.CommandLine -like '*next*dev*' -or $_.CommandLine -like '*turbopack-node*' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force }

Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
```

The second command must return nothing. If it still lists a connection, resolve its `OwningProcess` with `Get-Process -Id` and kill that PID directly.

Notes: filter on the command line rather than killing every `node.exe` — MCP servers (Playwright) and other tooling also run as `node.exe`. Prefer `Stop-Process` over `taskkill`, which can be blocked by the agent sandbox. `Start-Process … -NoNewWindow` children also die when the launching PowerShell tool call ends, so a server started in one call is already gone by the next one — start it and probe it inside a single call.

### Stale dev cache after removing a dependency

After uninstalling a dependency that server-side code loaded (anything reachable from `instrumentation.ts`, `next.config.ts`, or a server component), delete `.next/dev` before starting dev again. Turbopack's dev cache keeps the previously compiled chunks, so the server boots the stale `.next/dev/server/instrumentation.js` and dies with a confusing `Cannot find module '<pkg>-<hash>'` even though the source no longer imports it. A production `next build` is unaffected, which makes it look unrelated to the removal.

## Testing with Playwright

For testing/debugging in a real browser, the Playwright MCP server is configured in `.mcp.json` (`mcp__playwright__*` tools): navigate pages, read console messages, and take screenshots against the running dev server (see the Dev server section — do not start it yourself). Use it to verify things a build can't prove — e.g. the neonRoad WebGL header (click "press start" first, the initial header is a static fallback image) or MDX rendering. Playwright writes its logs/snapshots to `.playwright-mcp/`.

Multiple agent sessions share the same Playwright browser, so lock it before use to avoid another agent hijacking your session: create `.playwright-mcp/.lock` containing your session id and a timestamp. If the lock file already exists, another agent is using the browser — wait a bit and try again (a lock older than \~10 minutes is likely stale from a crashed session and may be removed). Always delete the lock file when you are done.

**Turbopack + MDX plugins**: Turbopack requires the MDX plugin config in `next.config.ts` to be JSON-serializable (plugin names as strings, options as plain objects). Plugins whose options need JS values (the custom github-alerts `build` function, shiki transformers, the autolink-headings `properties` callback) or that lack a default export live in wrapper modules under `lib/mdx/` that export a `[plugin, options]` tuple, referenced by absolute path. Don't move those options back inline into `next.config.ts` — that breaks the Turbopack build. Editing a `lib/mdx/` wrapper requires a dev-server restart (they're loaded by the MDX loader, not watched). The `build` script needs the explicit `--turbopack` flag because plugins (@next/mdx) inject webpack config functions that otherwise make `next build` bail. Building with `--webpack` is currently broken anyway on Next 16.2+ (MDX metadata false-positive, vercel/next.js#91735).

## Architecture

### MDX content pipeline (the core of the site)

* Posts/tutorials are route directories containing `page.mdx` (+ optional `page.module.css`, `opengraph-image.tsx`), mainly under `app/web_development/posts/` and `app/web_development/tutorials/`.
* The plugin chain is configured in `next.config.ts` inside `createMdx`: remark (`remark-frontmatter`, `remark-mdx-frontmatter`, `remark-table-of-contents`, `remark-gfm`) then rehype (`rehype-pretty-code` with shiki "synthwave-84", `rehype-slug`, `rehype-mdx-import-media`, `rehype-autolink-headings`, `rehype-github-alerts` with a custom `build` function and custom `MORE`/`WARN` alert keywords).
* Each `page.mdx` starts with YAML frontmatter, which `remark-mdx-frontmatter` exposes as a `frontmatter` variable; the page then does `export const metadata = { title: frontmatter.title, ... }` merging in shared objects from `shared/metadata-article.ts` / `shared/metadata.ts`. A `%toc%` placeholder in the MDX generates the table of contents (`maxDepth: 2`, container id `articleToc`).
* `mdx-components.tsx` maps MDX elements to components: `img` → `components/base/image/Dispatch`, `a` → `components/base/Link`, and the `aside#articleToc` emitted by the TOC plugin gets wrapped with `components/toc/Highlight` (scroll-position highlighting via `hooks/useIntersectionObserver`).
* `shared/donations-message.mdx` is imported into articles as a reusable MDX fragment.

### Notable non-content pieces

* `components/neonRoad/` — the WebGL header animation (react-three-fiber + drei + postprocessing), dynamically imported, with a canvas-2D fallback. three.js updates have broken its rendering before (see commit `adf612e`) — after bumping `three`/`@react-three/*`, visually verify the header animation.
* `components/neonRoad/player/` — music player built on the author's own `web-audio-api-player` and `waveform-visualizer` packages.
* OpenGraph images: per-route `opengraph-image.tsx` files (satori/ImageResponse — raw `<img>` required, `next/image` not supported there), plus a keyed generator at `app/web_development/og/[key]/opengraph-image.tsx` for article OG images referenced from frontmatter metadata.
* Sentry was fully removed (it was the reason `cacheComponents` got disabled and the reason the root layout was temporarily forced dynamic via `headers()`). Several tutorial MDX pages still document Sentry setups — that's article content, don't "fix" it. `cacheComponents` is still `false` in `next.config.ts`; enabling it is planned.
* CSP and security headers live in `securityHeadersConfig` in `next.config.ts`, with separate directive sets per environment (dev / Vercel preview / production, chosen via `VERCEL_ENV`). Adding any external resource (script, font, connect target) requires updating the matching CSP block.

### Linting setup (ESLint flat config, `eslint.config.mjs`)

* ESLint 10 with `defineConfig`. Type-aware linting via typescript-eslint `strictTypeChecked` + `stylisticTypeChecked` (`projectService: true`).
* React linting uses `@eslint-react/eslint-plugin` (`recommended-typescript` preset) — NOT `eslint-plugin-react` — plus `eslint-plugin-react-hooks` `recommended-latest`, which includes the React Compiler rules (there is no separate compiler ESLint plugin; the compiler itself is enabled via `reactCompiler: true` + `babel-plugin-react-compiler`). `react-hooks/set-state-in-effect` is deliberately downgraded to warn.
* Next.js rules come from `@next/eslint-plugin-next` directly — `eslint-config-next` is intentionally not used (it pins plugins incompatible with ESLint 10).
* MDX files are linted through `eslint-plugin-mdx`, which runs the remark-lint presets from `.remarkrc.mjs`; `.no-dead-urls.remarkrc.mjs` is a separate config used only by `check-urls`.
* Code style (enforced by `@stylistic`): 4-space indent, single quotes, no semicolons.

### TypeScript

* `typescript` in package.json is an npm alias to `@typescript/typescript6`, and `@typescript/native` aliases the TypeScript 7 native compiler — keep this in mind before "fixing" those version strings.
* `typedRoutes: true` — internal `href`s are type-checked as `Route`; casting is needed for dynamic strings.
* Path alias: `@/*` → repo root.

### CSS

* Vendor-prefixed declarations (e.g. `-webkit-backdrop-filter`) must come BEFORE their standard property. Turbopack's Lightning CSS merges both into one logical property where the last declaration wins and re-emits from that value — with the standard property first, only the `-webkit-` version ships, which silently breaks features in browsers without that alias (this killed the header's `backdrop-filter` glass effect once). The production build re-adds prefixes per the package.json browserslist; `next dev` does not, so verify prefix-sensitive effects in dev.

### Content conventions

* New article: create the route directory with `page.mdx`, copy the frontmatter shape from an existing post (`title`, `description`, `keywords`, `published`, `modified`, `permalink`, `section`), include the `export const metadata` block, use `%toc%` for the TOC.
* Images go in `public/assets/images/`; animated images under `public/assets/images/animated/` get immutable cache headers from `next.config.ts`.
* Several tutorial MDX pages document older setups (e.g. ESLint 9 with jsx-a11y) — that is article content, not a reflection of this repo's current config; don't "sync" the repo to match tutorial text or vice versa unless asked.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
