import Link from 'next/link'
import { ReactNode } from 'react'

export interface INavigationLinkProps {
    href: string
    children: ReactNode
}

const NavigationLink: React.FC<INavigationLinkProps> = (props): JSX.Element => {

    const { href, children, ...rest } = props

    return (
        <>
            <Link href={href} {...rest}>
                {children}
            </Link>
        </>
    )
}

export default NavigationLink