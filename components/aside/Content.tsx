import styles from './content.module.css'
import BaseLink from '@/components/base/Link'
import ShareButton from '@/components/base/button/Share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBug, faComments } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import buyMeACoffeeImport from '/public/assets/images/buy_me_a_coffee_button.png'

const AsideContent: React.FC = (): JSX.Element => {

    return (
        <div className={styles.content}>
            <ShareButton />
            <a href="https://www.buymeacoffee.com/chriswwweb" className={`${styles.coffeeButton} shake`}>
                <Image src={buyMeACoffeeImport} priority fill alt="buy me a coffee, please" />
            </a>
            <br />
            <span className="fontDarker">* Please 😉</span>
            <p className="fontSmall fontDarker alignLeft"><FontAwesomeIcon icon={faHeart} size="1x" color='rgb(255, 0, 170)' /> <BaseLink href="https://buymeacoffee.com/chriswwweb">Donations</BaseLink> are not mandatory but greatly appreciated, as they allow me to work on more content and keep the project free for everyone</p>
            <p className="fontSmall fontDarker alignLeft"><FontAwesomeIcon icon={faBug} size="1x" color='rgb(255, 0, 170)' /> If you find a bug / typo or you want to suggest a new feature, then please open an <BaseLink href="https://github.com/chrisweb/chris.lu/issues">Issue</BaseLink> on GitHub.</p>
            <p className="fontSmall fontDarker alignLeft"><FontAwesomeIcon icon={faComments} size="1x" color='rgb(255, 0, 170)' /> Suggestions and Ideas are appricated, please use the <BaseLink href="https://github.com/chrisweb/chris.lu/discussions">discussion board</BaseLink> to leave feedback or ask a question.</p>
        </div>
    )
}

export default AsideContent