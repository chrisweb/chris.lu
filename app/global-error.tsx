'use client'

import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'
import { useEffect } from 'react'

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
    useEffect(() => {
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
                    </section>
                </main>
            </body>
        </html>
    )
}