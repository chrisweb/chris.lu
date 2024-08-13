<a href="https://chris.lu">
  <picture>
    <source srcset="https://raw.githubusercontent.com/chrisweb/chrisweb/main/public/chris-lu_banner.avif"
      type="image/avif" />
    <source srcset="https://raw.githubusercontent.com/chrisweb/chrisweb/main/public/chris-lu_banner.webp"
      type="image/webp" />
    <img src="https://raw.githubusercontent.com/chrisweb/chrisweb/main/public/chris-lu_banner.jpg"
      alt="chris.lu banner" />
  </picture>
</a>

# chris.lu

Hello World! 👋 

This repository contains the source code for my blog ([chris.lu](https://chris.lu))

On [chris.lu](https://chris.lu), you will find my tutorials and can learn more about me

## Technologies used

During the development of the blog, I wrote a ["Next.js static MDX blog" tutorial](https://chris.lu/web-development/tutorials/next-js-static-mdx-blog) that showcases most of the technologies that I used

The framework I used is [Next.js 14](https://github.com/vercel/next.js) with [React 18](https://github.com/facebook/react) (I plan on upgrading to Next.js 15 and React 19 as soon as the first stable versions get released and will update my tutorial accordingly)

I added [MDX](https://mdxjs.com/) support to be able to create content using next/mdx. I then also used several remark and rehype plugins and even built two myself, [rehype-github-alerts
](https://github.com/chrisweb/rehype-github-alerts) and [remark-table-of-contents
](https://github.com/chrisweb/remark-table-of-contents)

I had a lot of fun doing my [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) header animation using [react-three-fiber](https://github.com/pmndrs/react-three-fiber) (a React renderer for [three.js](https://github.com/mrdoob/three.js))

I also added a jukebox on top using my [web-audio-api-player](https://github.com/chrisweb/web-audio-api-player) and added a dynamic waveform using my [waveform-visualizer](https://github.com/chrisweb/waveform-visualizer) and [waveform-data-generator](https://github.com/chrisweb/waveform-data-generator) packages

## Feedback & bug reports

If you have feedback or want to discuss something, please use the [chris.lu github discussions](https://github.com/chrisweb/chris.lu/discussions), and if you find a bug, please report it using the [github issues](https://github.com/chrisweb/chris.lu/issues)

## Scripts

`npm run dev`: launch a dev server instance  
`npm run dev-ssl`: same as dev but with a self signed SSL certificate for local HTTPS requests  
`npm run build`: production build  
`npm run build-debug`: production build with more verbose output, useful to debug builds  
`npm run start`: start production server  
`npm run next-lint`: backup of the default next.js lint command (use the next command instead)  
`npm run lint`: custom linting script for code and MDX content  
`npm run lint-nocache`: same as previous but without using the cache, useful when debugging  
`npm run lint-debug`: linting command but more verbose output  
`npm run lint-fix`: linting command that also attempts to automatically fix problems  
`npm run info`: the default next.js script to get some info about the project  
