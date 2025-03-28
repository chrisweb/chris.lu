import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'chrisweb\'s blog | chris.lu',
        short_name: 'chris.lu',
        theme_color: '#ff00aa',
        background_color: '#0f0019',
        start_url: '/',
        orientation: 'any',
        display: 'minimal-ui',
        dir: 'auto',
        lang: 'en-US',
        description: 'chrisweb\'s blog about web development, games, Lego, music, memes, ... | chris.lu',
        icons: [
            {
                purpose: 'any',
                src: '/apple-icon1.png',
                sizes: '152x152',
                type: 'image/png'
            },
            {
                purpose: 'any',
                src: '/apple-icon2.png',
                sizes: '167x167',
                type: 'image/png'
            },
            {
                purpose: 'any',
                src: '/apple-icon3.png',
                sizes: '180x180',
                type: 'image/png'
            },
            {
                purpose: 'any',
                src: '/apple-icon4.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                purpose: 'any',
                src: '/apple-icon5.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ],
        shortcuts: [
            {
                name: 'Home',
                url: '/'
            },
            {
                name: 'Web development',
                url: '/web_development'
            },
            {
                name: 'Lego',
                url: '/lego'
            },
            {
                name: 'Games',
                url: '/games'
            },
            {
                name: 'Music',
                url: '/music'
            },
            {
                name: 'Memes',
                url: '/memes'
            },
            {
                name: 'About Me',
                url: '/about_me'
            }
        ],
        screenshots: [
            {
                src: '/assets/images/chris-lu_banner.png',
                type: 'image/png',
                sizes: '2560x512',
            }
        ]
    }
}