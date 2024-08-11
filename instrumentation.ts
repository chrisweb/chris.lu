import * as Sentry from '@sentry/nextjs'

export function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        Sentry.init({
            dsn: 'https://daf0befe66519725bbe2ad707a11bbb3@o4504017992482816.ingest.us.sentry.io/4506763918770176',

            // Adjust this value in production, or use tracesSampler for greater control
            tracesSampleRate: 1,

            // Setting this option to true will print useful information to the console while you're setting up Sentry.
            debug: false,

            // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
            // spotlight: process.env.NODE_ENV === 'development',

            environment: process.env.NODE_ENV ? process.env.NODE_ENV : '',

        })
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
        Sentry.init({
            dsn: 'https://daf0befe66519725bbe2ad707a11bbb3@o4504017992482816.ingest.us.sentry.io/4506763918770176',

            // Adjust this value in production, or use tracesSampler for greater control
            tracesSampleRate: 1,

            // Setting this option to true will print useful information to the console while you're setting up Sentry.
            debug: false,

            environment: process.env.NODE_ENV ? process.env.NODE_ENV : '',
        })
    }
}
