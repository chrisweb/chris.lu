'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

// https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    useEffect(() => {
        Sentry.captureException(error)
    }, [error])

    return (
        <html>
            <body>
                <h2>Something went wrong!</h2>
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    )
}