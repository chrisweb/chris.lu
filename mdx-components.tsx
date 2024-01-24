import type { MDXComponents } from 'mdx/types'
import { PropsWithChildren } from 'react'
import HeadingsObserver from '@components/headings/Observer'
import NavigationLink from '@components/navigation/Link'
import ImageArticle from '@components/image/Article'
import { ImageProps } from 'next/image'
import Image from 'next/image'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h1: (props: PropsWithChildren) => (
            <h1 className="h1" {...props}>
                {props.children}
            </h1>
        ),
        h2: (props: PropsWithChildren) => (
            <h2 className="h2" {...props}>
                {props.children}
            </h2>
        ),
        h3: (props: PropsWithChildren) => (
            <h3 className="h3" {...props}>
                {props.children}
            </h3>
        ),
        h4: (props: PropsWithChildren) => (
            <h4 className="h4" {...props}>
                {props.children}
            </h4>
        ),
        h5: (props: PropsWithChildren) => (
            <h5 className="h5" {...props}>
                {props.children}
            </h5>
        ),
        h6: (props: PropsWithChildren) => (
            <h6 className="h6" {...props}>
                {props.children}
            </h6>
        ),
        // I have a types problem here
        // maybe related to: https://github.com/vercel/next.js/issues/50471
        a: ({ children, href, ...props }) => (
            <NavigationLink href={href} {...props}>
                {children}
            </NavigationLink>
        ),
        img: (props) => (<ImageArticle {...props as ImageProps} />),
        nav: ({ children, ...props }) => (
            <>
                {props['aria-label'] === 'table of contents' ? (
                    <>
                        <HeadingsObserver {...props}>
                            {children}
                        </HeadingsObserver>
                        <div className="buyMeACoffeeButtonContainer">
                            <a href="https://www.buymeacoffee.com/chriswwweb">
                                <Image src="/assets/images/buy_me_a_coffee_button.png" alt="button buy me a coffee" width="240" height="67" />
                            </a>
                        </div>
                    </>
                ) : (
                    <nav {...props}>
                        {children}
                    </nav>
                )}
            </>
        ),
        ...components,
    }
}