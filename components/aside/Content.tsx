import styles from './content.module.css'
import BaseLink from '@/components/base/Link'
import ShareButton from '@/components/base/button/Share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBug, faComments } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import buyMeACoffeeImport from '@/public/assets/images/buy_me_a_coffee_button.png'

const AsideContent: React.FC = () => {

    return (
        <div className={styles.content}>
            <ShareButton />
            <a href="https://www.buymeacoffee.com/chriswwweb" className={`${styles.coffeeButton} shake`} rel="noopener noreferrer" target="_blank">
                <Image src={buyMeACoffeeImport} priority fill alt="buy me a coffee, please" />
            </a>
            <br />
            <span className="fontDarker">* Please 😉</span>
            <p className="fontSmall fontDarker alignLeft">
                <FontAwesomeIcon icon={faHeart} size="1x" className="startInlineIcon" />
                <BaseLink href="https://buymeacoffee.com/chriswwweb">Buying me a coffee</BaseLink>
                or&nbsp;
                <BaseLink href="https://github.com/sponsors/chrisweb">sponsoring me</BaseLink>
                on GitHub, are not mandatory but greatly appreciated, as it allows me to work on more content and keep the project free for everyone
            </p>
            <p className="fontSmall fontDarker alignLeft">
                <FontAwesomeIcon icon={faBug} size="1x" className="startInlineIcon" />
                If you find a bug / typo or you want to suggest a new feature, then please open an&nbsp;
                <BaseLink href="https://github.com/chrisweb/chris.lu/issues">Issue</BaseLink>
                on GitHub.
            </p>
            <p className="fontSmall fontDarker alignLeft">
                <FontAwesomeIcon icon={faComments} className="startInlineIcon" />
                Suggestions and Ideas are appreciated, please use the&nbsp;
                <BaseLink href="https://github.com/chrisweb/chris.lu/discussions">discussion board</BaseLink>
                to leave feedback or ask a question.
            </p>
        </div>
    )
}

export default AsideContent