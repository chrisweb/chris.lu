import WithBundleAnalyzer from '@next/bundle-analyzer'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

const nextConfig = (phase) => {

    const withBundleAnalyzer = WithBundleAnalyzer({
        //enabled: phase === PHASE_DEVELOPMENT_SERVER ? true : false,
        enabled: false,
        //openAnalyzer: false,
    })

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        experimental: {
            appDir: true,
        },
        images: {
            formats: ['image/avif', 'image/webp']
        },
    }

    return withBundleAnalyzer(nextConfig)

}

export default nextConfig