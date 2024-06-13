Next open the `mdx-components.tsx` (which is in the root of your project) again and and lets add a third mdx component to customize the image elements, like so:

```mdx title="mdx-components.tsx" showLineNumbers {4-5} {26}
import type { MDXComponents } from 'mdx/types'
import BaseLink from '@/components/base/Link'
import type { Route } from 'next'
import BaseImage from '@/components/base/Image'
import type { ImageProps } from 'next/image'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        ul: ({ children, ...props }) => (
            <ul className="listContainer" {...props}>
                {children}
            </ul>
        ),
        a: ({ children, href, ...props }) => (
            <BaseLink href={href as Route} {...props}>
                {children}
            </BaseLink>
        ),
        img: (props) => (<BaseImage {...props as ImageProps} />),
        ...components,
    }
}
```

Line 4 to 5 we import the custom **BaseImage** component that we just created and we strictly type the props using the **ImageProps** type from next/image 

Line 26 we specify that for each markdown image that got transformed into an HTML `<img>` element we want to use our custom BaseImage component











explain how 3 things: style width 100%, sizes attribute and the values we configure in the config that will be used for the srcset work together
explain that static import is not the only solution to avoid cumulative layout shifts, you can also use fill, in which case the container helps preventing the layout size as the container has a size or by manually setting the width and height, which is often not a feasable option as you might fetch images dynamically and not know their width and height






#### Custom React component for images

Lets start by going into the `/components/base` folder we created earlier, then create a new `Image.tsx` file and add the following code:

```tsx title="/components/base/Image.tsx" showLineNumbers {1} {2} {11-20}
import Image from 'next/image'
import type { ImageProps } from 'next/image'

const BaseImage: React.FC<ImageProps> = (props): JSX.Element => {

    const imageProps = { ...props }

    return (
        <div
            style={{
                position: 'relative',
                width: '400px',
                height: '200px',
            }}
        >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
                /*style={{
                    width: '100%',
                    height: 'auto',
                }}*/
                style={{
                    objectFit: 'contain',
                }}
                sizes="(max-width: 70rem) 100vw, 70rem"
                //placeholder="blur"
                //width="2000"
                //height="2000"
                fill={true}
                {...(imageProps)}
            />
        </div>
    )
}

export default BaseImage
```

Line 1 we **import** the [next/image](https://nextjs.org/docs/app/api-reference/components/image) component which we then use in the return, where we set a few attribtes

Line 2 we import the **ImageProps** type to be able to strictly type the props of the image

Line 11 to 20 we use Next.js **Image** component and set some attributes:

* the **style** attribute is used to always display our image as wide as the main section
* the **sizes** attribute is used to tell the browser that if our screen width is below 70rem then we want the browser to chose an image that is at least as large as the screen (100vw = 100% of the view width), then after the comma the second part tells the browser that if the screen is wider than 70rem then we want to always use an image that has a width of 70rem
* then we also we add the remaining **imageProps** to the image, which are props like the width and height, the alt text and other optional attributes like the title