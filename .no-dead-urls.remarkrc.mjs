import remarkLintNoDeadUrls from 'remark-lint-no-dead-urls'

const config = {
    plugins: [
        //[remarkLintNoDeadUrls, { from: 'https://example.com' }]
        [remarkLintNoDeadUrls, {
            from: 'http://localhost:3000',
            skipUrlPatterns: [
                // can't find the anchor element for the hash
                // document is very big and loads slowly
                // might be due to a timeout
                '/*w3c.github.io*/',
                // pexels blocks all requests with a 403 (forbidden) response
                '/*pexels.com*/',
                // github urls with a hash for the line numbers
                // produce the error that the hash can not be found as anchor element
                // I do NOT want to disable all of github.com
                // disabling all the urls with a line number hash would be ideal but not sure how to do that
                // for now I search for /blob/ in the URL and exclude those
                '/*/blob/*/',
                // this page wants to redirect to a url with the language set
                // I prefer to use the URL with no language
                // so that it adapts to the user's language that will visit
                '/*azure.microsoft.com*/',
                // npmjs has low rate limit, often returns 429 (too many requests)
                '/*npmjs.com*/',
                // these domains often produce fetch errors
                '/*https://developer.apple.com/*/',
                '/*archive.org*/',
                // images have /public in their path
                // next.js however uses a cached version /_next/image?url=
                // for now I eclude them all, future we need something to convert URLs
                '/*/public/assets/images*/',
            ]
        }]
    ]
}

export default config