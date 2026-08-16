// single source of truth for the canonical production origin
// (canonical urls, sitemap, robots, structured data all build on this)
export const siteUrl = 'https://chris.lu'

export const siteName = 'Chris.lu'

export const siteLocale = 'en-US'

export const siteDescription = 'chrisweb\'s blog about web development, games, Lego, music and memes'

export const authorName = 'Chris Weber'

export const authorSameAs = [
    'https://github.com/chrisweb',
    'https://bsky.app/profile/chriswwweb.bsky.social',
    'https://mastodon.social/@chriswwweb',
]

/**
 * base url used by next.js to resolve relative metadata urls
 * (open graph and twitter images most importantly)
 *
 * on vercel VERCEL_URL is ALWAYS the unique per deployment url
 * (chris-lu-<hash>.vercel.app) and never the custom domain, using it in
 * production would advertise social images on the wrong origin, so
 * production is pinned to the canonical origin and VERCEL_URL is kept
 * for preview deployments only
 */
export const metadataBaseUrl = (): URL => {

    if (process.env.VERCEL_ENV === 'production') {
        return new URL(siteUrl)
    }

    if (process.env.VERCEL_URL) {
        return new URL(`https://${process.env.VERCEL_URL}`)
    }

    return new URL(`http://localhost:${process.env.PORT ?? '3000'}`)

}
