import BaseLink from '@/components/base/Link'
import BaseImage from '@/components/base/image/Dispatch'
import notFoundImage from '/public/assets/images/app/404.webp'

export default function NotFound() {
    return (
        <section className="core">
            <h2 className="h2">404 Page not found</h2>
            <p>Sorry, I looked everywhere but somehow I can&apos;t find this page.</p>
            <p>
                <BaseImage src={notFoundImage} alt="Pulp Fiction movie scene of Vincent Vega (played by John Travolta) looking around a room" title="{ animated }"></BaseImage>
            </p>
            <p>
                <BaseLink href="/">Return Home</BaseLink>
            </p>
        </section>
    )
}