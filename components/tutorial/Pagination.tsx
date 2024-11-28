import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import type { Route } from 'next'
import styles from './pagination.module.css'

interface IPaginationItem {
    label: string
    href: Route | URL
}

export interface IPaginationProps {
    previous?: IPaginationItem
    next?: IPaginationItem
}

const Pagination: React.FC<IPaginationProps> = (props): React.JSX.Element => {

    const { previous, next } = props

    return (
        <>
            <nav className={styles.nav} aria-label="Pagination">
                {previous && (
                    <div className={styles.borderLeft}>
                        <Link className={`fontSmall ${styles.coreLeft}`} href={previous.href}>
                            <div className="fontSmaller">Previous</div>
                            <div className="fontSmall">
                                <FontAwesomeIcon icon={faChevronLeft} size="sm" className={styles.iconLeft} />
                                {previous.label}
                            </div>
                        </Link>
                    </div>
                )}
                {next && (
                    <div className={styles.borderRight}>
                        <Link className={styles.coreRight} href={next.href}>
                            <div className="fontSmaller">Next</div>
                            <div className="fontSmall">
                                {next.label}
                                <FontAwesomeIcon icon={faChevronRight} size="sm" className={styles.iconRight} />
                            </div>
                        </Link>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Pagination