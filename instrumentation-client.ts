// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
    dsn: 'https://daf0befe66519725bbe2ad707a11bbb3@o4504017992482816.ingest.us.sentry.io/4506763918770176',

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart