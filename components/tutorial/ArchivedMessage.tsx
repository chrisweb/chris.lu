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
                {props.case === 'next-js-15-linting-to-16' && (
                    <>
                        <div className={styles.border}>
                            <div className={styles.core}>
                                <p>
                                    An <BaseLink href="/web_development/tutorials/next-js-16-linting-setup-eslint-9-flat-config"><strong>updated version</strong></BaseLink> of this tutorial for Next.js 16 is available.
                                    <br />
                                    <br />
                                    <span className={styles.message}>This tutorial is for <strong>Next.js 15</strong>. If you&rsquo;re using Next.js 16, please refer to the updated tutorial which includes breaking changes and the latest ESLint setup.</span>
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