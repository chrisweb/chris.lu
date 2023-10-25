import { ReactNode } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export interface INavigationLinkProps {
    href: string
    children: ReactNode
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

const NavigationLink: React.FC<INavigationLinkProps> = (props): JSX.Element => {

    const { href, children, ...rest } = props

    const isExternal = isExternalUrl(href, 'chris.lu')

    return (
        <>
            <Link href={href} {...rest}>
                {children}
            </Link>
            {isExternal && <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" className='externalLinkIcon' />}
        </>
    )
}

export default NavigationLink