'use client'

import { ErrorBoundary } from 'react-error-boundary'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import type { FC, JSX, PropsWithChildren, ReactNode } from 'react'
import { Children, cloneElement, isValidElement } from 'react'
import styles from './highlight.module.css'

interface IIntersectionObserverProps {
    headingsToObserve?: string
    rootMargin?: string
    threshold?: number
}

export type TocHighlightProps = PropsWithChildren<IIntersectionObserverProps>

interface IChildProps extends PropsWithChildren {
    className?: string
    href: string
    children: ReactNode
}

type ValidAnchorElement = ReactNode & IChildProps

const TocHighlight: FC<TocHighlightProps> = (props): JSX.Element => {

    const { headingsToObserve, rootMargin, threshold } = props

    const tocHeadingsToObserve = headingsToObserve ?? 'h1, h2, h3'
    const tocRootMargin = rootMargin ?? '-10% 0px -40% 0px'
    const tocThreshold = threshold ?? 1

    const children = Children.toArray(props.children)

    function recursiveChildren(children: ReactNode[], activeIdState: string): ReactNode {

        const newChildren = Children.map(children, (child) => {

            let clonedChild: ReactNode = child

            if (isValidElement<ValidAnchorElement>(child)) {

                const children = Children.toArray(child.props.children)

                clonedChild = cloneElement(
                    child,
                    { children: recursiveChildren(children, activeIdState) }
                )

                if ('href' in child.props) {

                    const childProps = child.props

                    if (childProps.href.substring(1) === activeIdState) {

                        clonedChild = cloneElement(
                            child,
                            { className: styles.active }
                        )

                    }
                }

            }

            return clonedChild
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