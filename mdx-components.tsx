import type { MDXComponents } from 'mdx/types'
import TocHighlight from '@/components/toc/Highlight'
import BaseLink from '@/components/base/Link'
import ImageDispatch from '@/components/base/image/Dispatch'
import { ImageProps } from 'next/image'
import type { Route } from 'next'
import AsideContent from '@/components/aside/Content'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h1: ({ children, ...props }) => (
            <h1 className="h1" {...props}>
                {children}
            </h1>
        ),
        h2: ({ children, ...props }) => (
            <h2 className="h2" {...props}>
                {children}
            </h2>
        ),
        h3: ({ children, ...props }) => (
            <h3 className="h3" {...props}>
                {children}
            </h3>
        ),
        h4: ({ children, ...props }) => (
            <h4 className="h4" {...props}>
                {children}
            </h4>
        ),
        h5: ({ children, ...props }) => (
            <h5 className="h5" {...props}>
                {children}
            </h5>
        ),
        h6: ({ children, ...props }) => (
            <h6 className="h6" {...props}>
                {children}
            </h6>
        ),
        a: ({ children, href, ...props }) => (
            <BaseLink href={href as Route} {...props}>
                {children}
            </BaseLink>
        ),
        img: (props) => (<ImageDispatch {...props as ImageProps} />),
        aside: ({ children, ...props }) => (
            <>
                {props.id === 'articleToc' ? (
                    <>
                        <aside>
                            <BaseLink href="#skipToc" className="skipToc">Skip table of contents</BaseLink>
                            <div className='asideCore'>
                                <TocHighlight>
                                    {children}
                                </TocHighlight>
                                <AsideContent />
                            </div>
                        </aside>
                        <div id="skipToc" tabIndex={-1} />
                    </>
                ) : (
                    <aside {...props}>
                        {children}
                    </aside>
                )
                }
            </>
        ),
        ...components,
    }
}