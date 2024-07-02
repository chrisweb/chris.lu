import BaseLink from '@/components/base/Link'

export default function NotFound() {
    return (
        <section className="core">
            <h1 className="h1">404 Page not found</h1>
            <p>Sorry, I looked everywhere but somehow I can&apos;t find this page.</p>
            <p>
                <picture>
                    <source srcSet="/assets/images/app/404.avif" type="image/avif" />
                    <source srcSet="/assets/images/app/404.webp" type="image/webp" />
                    <img src="/assets/images/app/404.webp" alt="Pulp Fiction movie scene of Vincent Vega (played by John Travolta) looking around a room" width="586" height="330" fetchPriority="high" decoding="async" />
                </picture>
            </p>
            <p>
                <BaseLink href="/">Return Home</BaseLink>
            </p>
        </section>
    )
}