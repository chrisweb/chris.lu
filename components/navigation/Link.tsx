import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export interface INavigationLinkProps extends PropsWithChildren {
    href: string
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

    if (urlLowerCase.slice(0,7) === 'http://' || urlLowerCase.slice(0,8) === 'https://') {

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

const NavigationLink: React.FC<INavigationLinkProps> = (props): JSX.Element => {

    const { href, children, ...linkProps } = props

    const isExternal = isExternalUrl(href, 'chris.lu')
    const isMe = isUrlMe(href)

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

export default NavigationLink