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
        <html lang="en">
            <body>
                <main>
                    <section className="core">
                        <h1 className="h3">
                            Sorry, something went wrong
                            &nbsp;
                            <span className="emoji">😞</span>
                        </h1>
                        <BaseButton
                            clickCallback={() => {
                                // attempt to recover by trying to re-render the segment
                                reset()
                            }}
                        >
                            Try again
                        </BaseButton>
                    </section>
                </main>

            </body>
        </html>
    )
}