import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import type { Route } from 'next'
import styles from './breadcrumbs.module.css'

export interface IListItem {
    label: string
    href: Route | URL
}

export interface IPaginationProps {
    list: IListItem[]
}

const Breadcrumbs: React.FC<IPaginationProps> = (props): React.JSX.Element => {

    const { list } = props

    return (
        <>
            <nav className={styles.nav} aria-label="Breadcrumbs">
                {list.map(listItem => (
                    <div key={crypto.randomUUID()} className={`fontSmall ${styles.inline}`}>
                        <Link href={listItem.href}>{listItem.label}</Link>
                        <FontAwesomeIcon icon={faChevronRight} size="sm" className={styles.icon} />
                    </div>
                ))}
            </nav>
        </>
    )
}

export default Breadcrumbs