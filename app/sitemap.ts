import type { MetadataRoute } from 'next'
import path from 'node:path'
import fs from 'node:fs'
import { glob } from 'glob'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import { siteUrl } from '@/shared/site'

declare module 'vfile' {
    interface DataMap {
        matter: {
            modified?: string
            permalink?: string
        }
    }
}

// paths are globbed relative to (and re-joined onto) a statically written
// "app" segment on purpose, a fully dynamic path.join(process.cwd(), page)
// makes turbopack trace the WHOLE project into the server bundle
const appDirectory = path.join(process.cwd(), 'app')

const routeFromFile = (page: string): string => {

    const route = page
        .replaceAll('\\', '/')
        .replace('/page.mdx', '')

    return `${siteUrl}/${route}`

}

const modifiedFromFrontmatter = (page: string): Date | undefined => {

    const pagePath = path.join(appDirectory, page)
    const pageContent = fs.readFileSync(pagePath, 'utf8')
    const vfile = new VFile(pageContent)

    matter(vfile, { strip: true })

    const modified = vfile.data.matter?.modified

    if (!modified) {
        return undefined
    }

    const date = new Date(modified)

    // guard against a malformed frontmatter date ending up in the sitemap
    return isNaN(date.getTime()) ? undefined : date

}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    // changeFrequency and priority are deliberately not set, search engines
    // ignore both, whereas lastModified is used but only stays trustworthy
    // when it reflects a real edit, so it is emitted only for pages that
    // actually declare a "modified" date in their frontmatter
    const siteMap: MetadataRoute.Sitemap = [{
        url: siteUrl,
    }]

    // every mdx route on the site, whatever its nesting depth
    const pages = await glob('**/page.mdx', { cwd: appDirectory })

    pages.forEach((page) => {

        const modified = modifiedFromFrontmatter(page)

        siteMap.push({
            url: routeFromFile(page),
            ...modified && { lastModified: modified },
        })

    })

    return siteMap.sort((a, b) => a.url.localeCompare(b.url))

}
