interface IProps {
    children?: React.ReactNode
}

const Test: React.FC<IProps> = (props): JSX.Element => {

    console.log(props)

    return (
        <>
            <p>{props.children}</p>
        </>
    )
}

export default Test