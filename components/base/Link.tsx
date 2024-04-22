import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { Route } from 'next'

export interface IBaseLinkProps extends PropsWithChildren {
    href: Route<string> | URL
    target?: string
    rel?: string
    className?: string
}

const isExternalUrl = (url: string, domain: string): boolean => {

    const urlLowerCase = url.toLowerCase()
    
    const firstCharacter = urlLowerCase.charAt(0)

    if (firstCharacter === '#' || firstCharacter === '/') {
        return false
    }

    if (urlLowerCase.startsWith('http://') || urlLowerCase.startsWith('https://')) {

        const urlNoProtocol = urlLowerCase.replace('http://','').replace('https://','')

        const potentialDomain = urlNoProtocol.split('/')[0]

        if (potentialDomain !== domain) {
            return true
        }

    }

    return false

}

const isUrlMe = (url: string): boolean => {

    const urlLowerCase = url.toLowerCase()

    const urlNoProtocol = urlLowerCase.replace('http://','').replace('https://','')
    
    if (urlNoProtocol.startsWith('github.com/chrisweb')) {
        return true
    }

    return false

}

const BaseLink: React.FC<IBaseLinkProps> = (props): JSX.Element => {

    const { href, children, ...linkProps } = props

    const isExternal = isExternalUrl(href.toString(), 'chris.lu')
    const isMe = isUrlMe(href.toString())

    if (isExternal) {
        linkProps.rel = 'nofollow noopener noreferrer'
        linkProps.target = '_blank'
    }

    if (isMe) {
        linkProps.rel = 'me'
    }

    return (
        <>
            <Link href={href} {...linkProps}>
                {children}
            </Link>
            {isExternal && <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" className='externalLinkIcon' />}
        </>
    )
}

export default BaseLink