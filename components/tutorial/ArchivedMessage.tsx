import BaseLink from '../base/Link'
import styles from './archived-message.module.css'

export interface IArchivedMessageProps {
    case: string
}

const ArchivedMessage: React.FC<IArchivedMessageProps> = (props) => {

    return (
        <>
            <div className={styles.nav} aria-label="Breadcrumbs">
                {props.case === 'next-js-14-static-tutorial' && (
                    <>
                        <div className={styles.border}>
                            <div className={styles.core}>
                                <p>
                                    A <BaseLink href="/web_development/tutorials/next-js-static-first-mdx-starterkit"><strong>newer version</strong></BaseLink> of this tutorial is available.
                                    <br />
                                    <br />
                                    <span className={styles.message}>This Next.js 14 Tutorial is <strong>archived</strong>. This does not mean the information it contains is outdated, but it is no longer being updated.</span>
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default ArchivedMessage