import { useObserver } from '../../hooks/useObserver'

interface IProps {
    children?: React.ReactNode
}

const HeadingsObserver: React.FC<IProps> = (props): JSX.Element => {

    console.log(props.children)

    const activeId = useObserver('h1 h2 h3 h4 h5 h6', '-20% 0% -35% 0px')

    return (
        <>
            
        </>
    )
}

export default HeadingsObserver