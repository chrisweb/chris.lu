'use client'

import { ErrorBoundary } from 'react-error-boundary'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import type { PropsWithChildren, ReactElement, ReactNode } from 'react'
import { Children, cloneElement, isValidElement } from 'react'
import styles from './highlight.module.css'

interface IProps extends PropsWithChildren {
    headingsToObserve?: string
    rootMargin?: string
    threshold?: number
}

interface IChildProps {
    className: string
    href: string
    children: ReactElement<IChildProps>
}


const TocHighlight: React.FC<IProps> = (props): JSX.Element => {

    const { headingsToObserve, rootMargin, threshold } = props

    const tocHeadingsToObserve = headingsToObserve ?? 'h1, h2, h3'
    const tocRootMargin = rootMargin ?? '-10% 0px -50% 0px'
    const tocThreshold = threshold ?? 1

    const children = Children.toArray(props.children)

    function recursiveChildren(children: ReactNode[], activeIdState: string): ReactNode {

        const newChildren = Children.map(children, child => {

            if (isValidElement<IChildProps>(child)) {

                if (child.props.children) {

                    const children = Children.toArray(child.props.children)

                    child = cloneElement(
                        child,
                        { children: recursiveChildren(children, activeIdState) as ReactElement<IChildProps> }
                    )

                }

                if ('href' in child.props) {

                    const childProps = child.props as IChildProps

                    if (childProps.href.substring(1) === activeIdState) {

                        child = cloneElement(
                            child,
                            { className: styles.active }
                        )

                    }
                }

            }

            return child
        })

        return newChildren

    }

    // the second part is the rootMargin string of the IntersectionObserver
    // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
    const { activeIdState } = useIntersectionObserver(tocHeadingsToObserve, tocRootMargin, tocThreshold)

    return (
        <>
            <ErrorBoundary fallback={<div className="error">Toc error</div>}>
                <div className={styles.tocContainer}>
                    {recursiveChildren(children, activeIdState)}
                </div>
            </ErrorBoundary>
        </>
    )
}

export default TocHighlight