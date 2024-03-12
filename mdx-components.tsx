import type { MDXComponents } from 'mdx/types'
import HeadingsObserver from '@/components/headings/Observer'
import BaseLink from '@/components/base/Link'
import BaseImage from '@/components/base/Image'
import { ImageProps } from 'next/image'
import Image from 'next/image'
import type { Route } from 'next'

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
        img: (props) => (<BaseImage {...props as ImageProps} />),
        aside: ({ children, ...props }) => (
            <>
                {props['id'] === 'articleToc' ? (
                    <aside>
                        <div className='asideCore'>
                            <HeadingsObserver>
                                {children}
                            </HeadingsObserver>
                            <div className="buyMeACoffeeButtonContainer">
                                <a href="https://www.buymeacoffee.com/chriswwweb">
                                    <Image src="/assets/images/buy_me_a_coffee_button.png" alt="button buy me a coffee" width="240" height="67" />
                                </a>
                            </div>
                        </div>
                    </aside>
                ) : (
                    <aside>
                        {children}
                    </aside>
                )
                }
            </>
        ),
        ...components,
    }
}