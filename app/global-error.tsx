'use client' // Error components must be Client Components

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import BaseButton from '@/components/base/button/Base'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    useEffect(() => {
        // log the error to Sentry.io
        Sentry.captureException(error)
    }, [error])

    return (
        <html>
            <body>
                <main>
                    <section className="core">
                        <h2 className="h2">Sorry, something went wrong <span className="emoji">😞</span></h2>
                        <BaseButton
                            clickCallback={() => reset()} // attempt to recover by trying to re-render the segment
                        >
                            Try again
                        </BaseButton>
                    </section>
                </main>

            </body>
        </html>
    )
}