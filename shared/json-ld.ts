import { siteUrl, siteName, siteLocale, siteDescription, authorName, authorSameAs } from '@/shared/site'

// stable @ids so the nodes can be referenced instead of repeated
export const authorId = `${siteUrl}/#author`
export const websiteId = `${siteUrl}/#website`

export interface IArticleFrontmatter {
    title: string
    description: string
    keywords?: string[]
    published: string
    modified: string
    permalink: string
    section?: string
}

interface IJsonLdNode {
    '@type': string
    '@id'?: string
    [key: string]: unknown
}

export const personNode = (): IJsonLdNode => ({
    '@type': 'Person',
    '@id': authorId,
    'name': authorName,
    'alternateName': 'chrisweb',
    'url': `${siteUrl}/about_me`,
    'sameAs': authorSameAs,
})

export const websiteNode = (): IJsonLdNode => ({
    '@type': 'WebSite',
    '@id': websiteId,
    'url': `${siteUrl}/`,
    'name': siteName,
    'description': siteDescription,
    'inLanguage': siteLocale,
    'publisher': { '@id': authorId },
})

/**
 * breadcrumbs are built from the permalink and the frontmatter section, so
 * only human readable labels end up in the trail (never a raw url slug)
 * e.g. https://chris.lu/web_development/tutorials/foo
 * => Home > Web development > <article title>
 */
const breadcrumbNode = (frontmatter: IArticleFrontmatter): IJsonLdNode => {

    const items: IJsonLdNode[] = [{
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${siteUrl}/`,
    }]

    const [sectionSlug] = new URL(frontmatter.permalink).pathname
        .split('/')
        .filter(Boolean)

    if (frontmatter.section && sectionSlug) {
        items.push({
            '@type': 'ListItem',
            'position': items.length + 1,
            'name': frontmatter.section,
            'item': `${siteUrl}/${sectionSlug}`,
        })
    }

    items.push({
        '@type': 'ListItem',
        'position': items.length + 1,
        'name': frontmatter.title,
        'item': frontmatter.permalink,
    })

    return {
        '@type': 'BreadcrumbList',
        '@id': `${frontmatter.permalink}#breadcrumb`,
        'itemListElement': items,
    }

}

/**
 * tutorials are marked up as TechArticle (a more specific Article subtype
 * google understands), everything else as BlogPosting
 */
const articleType = (permalink: string): string => {
    return permalink.includes('/tutorials/') ? 'TechArticle' : 'BlogPosting'
}

export const articleGraph = (frontmatter: IArticleFrontmatter, image?: string): Record<string, unknown> => {

    const webPageId = `${frontmatter.permalink}#webpage`

    const articleNode: IJsonLdNode = {
        '@type': articleType(frontmatter.permalink),
        '@id': `${frontmatter.permalink}#article`,
        'isPartOf': { '@id': webPageId },
        'mainEntityOfPage': { '@id': webPageId },
        'headline': frontmatter.title,
        'description': frontmatter.description,
        'datePublished': frontmatter.published,
        'dateModified': frontmatter.modified,
        'inLanguage': siteLocale,
        'author': { '@id': authorId },
        'publisher': { '@id': authorId },
    }

    if (image) {
        articleNode.image = new URL(image, siteUrl).href
    }

    if (frontmatter.keywords?.length) {
        articleNode.keywords = frontmatter.keywords
    }

    if (frontmatter.section) {
        articleNode.articleSection = frontmatter.section
    }

    const webPageNode: IJsonLdNode = {
        '@type': 'WebPage',
        '@id': webPageId,
        'url': frontmatter.permalink,
        'name': frontmatter.title,
        'description': frontmatter.description,
        'isPartOf': { '@id': websiteId },
        'inLanguage': siteLocale,
        'breadcrumb': { '@id': `${frontmatter.permalink}#breadcrumb` },
        'datePublished': frontmatter.published,
        'dateModified': frontmatter.modified,
    }

    return {
        '@context': 'https://schema.org',
        '@graph': [
            articleNode,
            webPageNode,
            breadcrumbNode(frontmatter),
            websiteNode(),
            personNode(),
        ],
    }

}

export const siteGraph = (): Record<string, unknown> => ({
    '@context': 'https://schema.org',
    '@graph': [
        websiteNode(),
        personNode(),
    ],
})

export interface ISectionPage {
    title: string
    description: string
    path: string
    // CollectionPage for hub pages listing other pages, AboutPage for the
    // about me page, WebPage for the rest
    type?: 'WebPage' | 'CollectionPage' | 'AboutPage'
}

export const sectionGraph = (page: ISectionPage): Record<string, unknown> => {

    const url = `${siteUrl}${page.path}`
    const pageId = `${url}#webpage`

    const pageNode: IJsonLdNode = {
        '@type': page.type ?? 'WebPage',
        '@id': pageId,
        'url': url,
        'name': page.title,
        'description': page.description,
        'isPartOf': { '@id': websiteId },
        'inLanguage': siteLocale,
        'breadcrumb': { '@id': `${url}#breadcrumb` },
        'about': { '@id': authorId },
    }

    const breadcrumb: IJsonLdNode = {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': `${siteUrl}/`,
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': page.title,
                'item': url,
            },
        ],
    }

    return {
        '@context': 'https://schema.org',
        '@graph': [
            pageNode,
            breadcrumb,
            websiteNode(),
            personNode(),
        ],
    }

}
