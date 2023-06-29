import type { MDXComponents } from 'mdx/types'
import { PropsWithChildren } from 'react'
import HeadingsObserver from './components/headings/Observer'
import NavigationLink from './components/navigation/Link'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents) {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h1: (props: PropsWithChildren) => (
            <h1 className="foo" {...props}>
                {props.children}
            </h1>
        ),
        // I have a types problem here
        // maybe related to: https://github.com/vercel/next.js/issues/50471
        a: ({ children, href, ...props }) => (
            <NavigationLink href={href} {...props}>
                {children}
            </NavigationLink>
        ),
        HeadingsObserver,
        ...components,
    }
}