//import styles from './footer.module.css'
import BaseLink from '@/components/base/Link'

const Disclaimer: React.FC = () => {

    return (
        <>
            <hr /*className={/*styles.layoutFooterSeparator} *//>
            <p className="fontDarker">
                All content on this site is licensed under a&nbsp;
                <BaseLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</BaseLink>
                license. The source code of this project is licensed under&nbsp;
                <BaseLink href="https://github.com/chrisweb/chris.lu/blob/main/LICENSE">MIT</BaseLink>
                and a copy of the source code can be found in the&nbsp;
                <BaseLink href="https://github.com/chrisweb/chris.lu">chris.lu public GitHub repository</BaseLink>
                . A list of all open source packages used to build this project can be found in the&nbsp;
                <BaseLink href="https://github.com/chrisweb/chris.lu/blob/main/package.json">package.json</BaseLink>
                file. This website uses music licensed under different creative commons licenses, the music tracks&nbsp;
                <BaseLink href="https://github.com/chrisweb/chris.lu/blob/main/public/assets/music/CREDITS.txt">credits</BaseLink>
                file can be found in the repository of this project or by clicking on the &quot;eject&quot; button of the player on the top right of the screen. This website uses&nbsp;
                <BaseLink href="https://fontawesome.com/search?o=r&m=free">Free Icons by Font Awesome</BaseLink>
                .
            </p>
        </>
    )
}

export default Disclaimer