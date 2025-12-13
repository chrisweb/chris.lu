<a href="https://chris.lu">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/chrisweb/chrisweb/main/public/chris-lu_banner.avif" type="image/avif" />
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/chrisweb/chrisweb/main/public/chris-lu_banner.webp" type="image/webp" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/chrisweb/chrisweb/main/public/chris-lu_banner.avif" type="image/avif" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/chrisweb/chrisweb/main/public/chris-lu_banner.webp" type="image/webp" />
    <img src="https://raw.githubusercontent.com/chrisweb/chrisweb/main/public/chris-lu_banner.jpg" alt="chris.lu banner" />
  </picture>
</a>

# chris.lu

Hello World! 👋 

This repository contains the source code for my blog ([chris.lu](https://chris.lu))

On [chris.lu](https://chris.lu), you will find my tutorials and can learn more about me

## Technologies used

During development, I wrote a ["Next.js static first starterkit" tutorial](https://chris.lu/web_development/tutorials/next-js-static-first-mdx-starterkit) showcasing the technologies used in this blog. My favorite approach when working with Next.js is to start with a static core, later you can add dynamic islands where necessary. 

### Content & MDX

I added [MDX](https://mdxjs.com/) support to be able to create content using **@next/mdx**. The project uses a comprehensive MDX plugin pipeline:

- **Remark plugins**: `remark-gfm`, `remark-frontmatter`, `remark-mdx-frontmatter`, [remark-table-of-contents](https://github.com/chrisweb/remark-table-of-contents) (custom)
- **Rehype plugins**: `rehype-pretty-code`, [rehype-github-alerts](https://github.com/chrisweb/rehype-github-alerts) (custom), `rehype-slug`, `rehype-autolink-headings`, `rehype-mdx-import-media`

Content is written as MDX files in the `app/` directory with YAML frontmatter for metadata. The `%toc%` placeholder auto-generates a table of contents.

### Special Features

**WebGL Header Animation**: I had a lot of fun doing my [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) header animation using [react-three-fiber](https://github.com/pmndrs/react-three-fiber) (a React renderer for [three.js](https://github.com/mrdoob/three.js)). The animation is dynamically imported and includes adaptive DPR for performance.

**Music Player**: I also added a jukebox like music player (on the top right) using my [web-audio-api-player](https://github.com/chrisweb/web-audio-api-player) and added a dynamic waveform using my [waveform-visualizer](https://github.com/chrisweb/waveform-visualizer) and [waveform-data-generator](https://github.com/chrisweb/waveform-data-generator) packages

## Quick Start

### Prerequisites

- **Node.js** >= 20.11.0
- **npm** (comes with Node.js)

### Installation & First Run

1. Clone the repository:
   ```bash
   git clone https://github.com/chrisweb/chris.lu.git
   cd chris.lu
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Troubleshooting

- **Port already in use**: Set a custom port with `PORT=3001 npm run dev`
- **Build errors**: Try `npm run lint-fix` to auto-fix linting issues
- **Node version mismatch**: Check your Node version with `node -v` (must be >= 20.11.0)

## Development Workflow

### Running Locally

- `npm run dev` - Standard development server
- `npm run dev-ssl` - Development with self-signed SSL certificate (requires certificate setup)

### Linting

The project uses ESLint 9 with flat config for code and MDX content:

- `npm run lint` - Check code and MDX for issues (used in build)
- `npm run lint-fix` - Auto-fix linting problems
- `npm run lint-nocache` - Lint without cache (useful for debugging)
- `npm run lint-debug` - Verbose linting output
- `npm run check-urls` - Validate external URLs in content (run sporadically, not in build)

**When to use which**:
- During development: `npm run lint-fix` to auto-correct issues
- Before committing: `npm run lint` to verify
- Periodically: `npm run check-urls` to validate external links

### Creating Content

1. **Blog posts/tutorials**: Create `.mdx` files in `app/web_development/posts/` or `app/web_development/tutorials/`
2. **Add frontmatter** at the top of each MDX file:
   ```yaml
   ---
   title: "Your Post Title"
   description: "Brief description"
   date: "2025-01-15"
   ---
   ```
3. **Table of contents**: Use `%toc%` placeholder where you want the TOC to appear
4. **Images**: Place in `public/assets/images/` and reference with `/assets/images/your-image.jpg`
5. **OpenGraph images**: Create `opengraph-image.tsx` in the same directory as your page or use a global opengraph for a route segment as done in app\web_development\og\[key]

## Feedback & bug reports

If you have feedback or want to discuss something, please use the [chris.lu github discussions](https://github.com/chrisweb/chris.lu/discussions), and if you find a bug, please report it using the [github issues](https://github.com/chrisweb/chris.lu/issues)

## License

Link to the [license document](https://github.com/chrisweb/chris.lu/blob/main/LICENSE)  
