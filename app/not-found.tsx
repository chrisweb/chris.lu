import BaseLink from '@/components/base/Link'
import webpNotFoundStaticImport from '/public/assets/images/animated/404.webp'
import ImageAnimatedPicture from '@/components/base/image/AnimatedPicture'

export default function NotFound() {
    return (
        <section className="core">
            <h1 className="h1">404 Page not found</h1>
            <p>Sorry, I looked everywhere but somehow I can&apos;t find this page.</p>
            <p>
                <ImageAnimatedPicture avifPath='/assets/images/animated/404.avif' webpStaticImport={webpNotFoundStaticImport} priority alt="Pulp Fiction movie scene of Vincent Vega (played by John Travolta) looking around a room" className="animatedPicture" />
            </p>
            <p>
                <BaseLink href="/">Return Home</BaseLink>
            </p>
        </section>
    )
}