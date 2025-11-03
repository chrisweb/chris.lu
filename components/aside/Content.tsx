import styles from './content.module.css'
import BaseLink from '@/components/base/Link'
import ShareButton from '@/components/base/button/Share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faMastodon, faDiscord, faBluesky } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import buyMeACoffeeImport from '@/public/assets/images/buy_me_a_coffee_button.png'

const AsideContent: React.FC = () => {

    return (
        <div className={styles.content}>
            <ShareButton />
            <a href="https://www.buymeacoffee.com/chriswwweb" className={`${styles.coffeeButton} shake`} rel="noopener noreferrer" target="_blank">
                <Image src={buyMeACoffeeImport} priority fill alt="buy me a coffee, please" />
            </a>
            <span className="fontDarker">* Please 😉</span>
            <p>
                <BaseLink href="https://discord.gg/4p59CCTUAJ" noExternalIcon={true}>
                    <FontAwesomeIcon icon={faDiscord} color="white" size="2x" className="socialIcon" />
                </BaseLink>
                <BaseLink href="https://bsky.app/profile/chriswwweb.bsky.social" noExternalIcon={true}>
                    <FontAwesomeIcon icon={faBluesky} color="white" size="2x" className="socialIcon" />
                </BaseLink>
                <BaseLink href="https://github.com/chrisweb" noExternalIcon={true}>
                    <FontAwesomeIcon icon={faGithub} color="white" size="2x" className="socialIcon" />
                </BaseLink>
                <BaseLink href="https://mastodon.social/@chriswwweb" noExternalIcon={true}>
                    <FontAwesomeIcon icon={faMastodon} color="white" size="2x" className="socialIcon" />
                </BaseLink>
            </p>
        </div>
    )
}

export default AsideContent