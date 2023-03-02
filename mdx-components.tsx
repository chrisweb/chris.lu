import type { MDXComponents } from 'mdx/types'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.
/*const H1 = ({ children }) => {
    // ...
}*/

/*const H2 = ({ children }) => {
    // ...
}*/

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {

    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    //return { h1: H1, h2: H2, ...components }

    return { ...components }
}