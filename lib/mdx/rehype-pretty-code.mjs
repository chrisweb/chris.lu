// wrapper module for the MDX pipeline (see next.config.ts): Turbopack passes
// plugin configs to the MDX loader as JSON, so options containing JS functions
// (here the shiki transformers) must live in a module that gets referenced by
// path instead of being declared inline in the next config
import { rehypePrettyCode } from 'rehype-pretty-code'
import { transformerNotationDiff } from '@shikijs/transformers'

// https://rehype-pretty-code.netlify.app/
const rehypePrettyCodeOptions = {
    // VSCode "SynthWave '84" theme
    theme: 'synthwave-84',
    // Keep the background or use a custom background color?
    keepBackground: true,
    tokensMap: {
        function: 'entity.name.function',
        string: 'string',
        key: '.meta.object-literal.key',
    },
    defaultLang: {
        block: 'tsx',
        inline: 'shell',
    },
    transformers: [transformerNotationDiff({
        matchAlgorithm: 'v3',
    })],
}

// a unified "plugin tuple": [plugin, options]
export default [rehypePrettyCode, rehypePrettyCodeOptions]
