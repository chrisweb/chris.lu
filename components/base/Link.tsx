import type { PropsWithChildren } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import type { Route } from 'next'

export interface IBaseLinkProps extends PropsWithChildren {
    href: Route | URL
    target?: string
    rel?: string
    className?: string
    noExternalIcon?: boolean
}

const isExternalUrl = (url: string, domain: string): boolean => {

    const urlLowerCase = url.toLowerCase()

    const firstCharacter = urlLowerCase.charAt(0)

    if (firstCharacter === '#' || firstCharacter === '/') {
        return false
    }

    if (urlLowerCase.startsWith('http://') || urlLowerCase.startsWith('https://')) {

        const urlNoProtocol = urlLowerCase.replace('http://', '').replace('https://', '')

        const potentialDomain = urlNoProtocol.split('/')[0]

        if (potentialDomain !== domain) {
            return true
        }

    }

    return false

}

const isUrlMe = (url: string): boolean => {

    const urlLowerCase = url.toLowerCase()

    const urlNoProtocol = urlLowerCase.replace('http://', '').replace('https://', '')

    if (urlNoProtocol === 'github.com/chrisweb') {
        return true
    }

    return false

}

const BaseLink: React.FC<IBaseLinkProps> = (props) => {

    const { href, children, noExternalIcon, ...linkProps } = props
    const newLinkProps = { ...linkProps }

    const isExternal = isExternalUrl(href.toString(), 'chris.lu')
    const isMe = isUrlMe(href.toString())
    const withExternalIcon = isExternal && !noExternalIcon

    if (isExternal) {
        newLinkProps.rel = 'noopener noreferrer'
        newLinkProps.target = '_blank'
    }

    if (isMe) {
        newLinkProps.rel = 'me'
    }

    return (
        <>
            {(withExternalIcon) ?
                (
                    <>
                        <a href={href.toString()} {...newLinkProps}>
                            {children}
                        </a>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" className="inlineIcon" />
                    </>
                ) :
                (
                    <Link href={href} {...newLinkProps}>
                        {children}
                    </Link>
                )}
        </>
    )
}

export default BaseLink