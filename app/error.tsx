'use client' // Error components must be Client Components

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function Error({
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
        <div>
            <h2>Sorry, something went wrong 😞</h2>
            <button
                onClick={() => reset()} // attempt to recover by trying to re-render the segment
            >
                Try again
            </button>
        </div>
    )
}