'use client'

import { ErrorBoundary } from 'react-error-boundary'
import useObserver from '../../hooks/useObserver'
import { Children, isValidElement, cloneElement, MouseEvent } from 'react'
import styles from './observer.module.css'

interface IProps {
    id?: string
    children?: React.ReactNode | React.ReactNode[]
}

const findFirstNodeThatMatchesType = (children: React.ReactNode, type: string): React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | undefined => {

    const childrenArray = Children.toArray(children)

    for (const child of childrenArray) {
        if (isValidElement(child)) {
            if (child.type === type) {
                return child
            }
        }
    }

}

const findFirstNodeThatHasProp = (children: React.ReactNode, prop: string) => {

    const childrenArray = Children.toArray(children)

    for (const child of childrenArray) {
        if (isValidElement(child)) {
            if (prop in child.props) {
                return child
            }
        }
    }

}

const onClickLinkHandler = (event: MouseEvent<HTMLAnchorElement>): void => {

    event.preventDefault()

    const targetUrl = event.currentTarget.href
    const targetId = targetUrl.slice(targetUrl.indexOf('#'))
    const heading = document.querySelector(targetId)

    if (heading) {
        heading.scrollIntoView({
            behavior: 'smooth',
        })
    }
}

const findAndTransformRows = (children: React.ReactNode, activeIdState: string, level = 0): React.ReactNode => {

    const ulChildInput = findFirstNodeThatMatchesType(children, 'ul')

    let ulChildOutput: React.ReactNode

    if (typeof ulChildInput !== 'undefined') {

        level++

        let liChildrenInput: React.ReactElement[] = []

        if (typeof ulChildInput.props === 'object' && ulChildInput.props !== null && 'children' in ulChildInput.props) {
            liChildrenInput = ulChildInput.props.children as React.ReactElement[]
        }

        const liChildrenOutput = liChildrenInput.map((liChild: React.ReactElement<HTMLLIElement>, index: number) => {

            if (isValidElement(liChild)) {

                if (liChild.type === 'li') {

                    const liChildProps = liChild.props as React.PropsWithChildren
                    const liChildChildren = liChildProps as React.ReactNode

                    const liChildLinkInput = findFirstNodeThatHasProp(liChildChildren, 'href') as React.ReactElement<HTMLAnchorElement>

                    if (typeof liChildLinkInput !== 'undefined') {

                        const liChildLinkId = liChildLinkInput.props.href.slice(1)
                        const moreRows = findAndTransformRows(liChildProps.children, activeIdState, level)

                        const clonedLinkChild = cloneElement(
                            liChildLinkInput,
                            {
                                ...liChildLinkInput?.props,
                                className: 'animatedUnderline noUnderline',
                                onClick: onClickLinkHandler,
                            } as React.PropsWithChildren<HTMLAnchorElement>
                        )

                        const clonedLiChild = cloneElement(
                            liChild,
                            {
                                ...liChildProps,
                                key: level + '_' + index ?? liChild.key,
                                className: activeIdState === liChildLinkId ? styles.active : styles.notActive,
                                children: moreRows ? [clonedLinkChild, moreRows] : clonedLinkChild
                            } as unknown as React.PropsWithChildren<HTMLLIElement>
                        )

                        return clonedLiChild

                    }

                }
            }

            return liChild

        })

        if (typeof ulChildInput.props === 'object' && ulChildInput.props !== null) {

            const ulChildInputProps = ulChildInput.props as React.PropsWithChildren<{ className: string }>

            ulChildOutput = cloneElement(
                ulChildInput,
                {
                    className: 'className' in ulChildInput.props ? ulChildInputProps.className + styles.list : styles.list
                } as React.PropsWithChildren,
                liChildrenOutput,
            )

        }

    }

    return ulChildOutput

}

const HeadingsObserver: React.FC<IProps> = (props): JSX.Element => {

    // remarkTableOfContents maxDepth option is set to 3, so only observe h1, h2 & h3
    // the second part is the rootMargin string of the IntersectionObserver
    // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
    const { activeIdState } = useObserver('h1, h2, h3', '-25% 0px -35% 0px')
    const navChild = findFirstNodeThatMatchesType(props.children, 'nav')

    let toc: React.ReactNode

    if (navChild && typeof navChild.props === 'object' && navChild.props !== null && 'children' in navChild.props) {
        toc = findAndTransformRows(navChild.props.children as React.ReactNode[], activeIdState)
    }

    return (
        <>
            <ErrorBoundary fallback={<div className="error">Toc error</div>}>
                <div className={styles.tocContainer}>
                    {toc}
                </div>
            </ErrorBoundary>
        </>
    )
}

export default HeadingsObserver