import Image, { ImageProps } from 'next/image'

const BaseImage: React.FC<ImageProps> = (props): JSX.Element => {

    let placeholder = true

    // something is odd here, but I have not found the reason yet
    // src is either of type string or StaticImport and somehow ts
    // thinks that when it is of type StaticImport that the object
    // has no properties
    // @ts-expect-error: because the library definition is wrong
    if (props.src?.src.slice(-3) === 'gif') {
        placeholder = false
        props.unoptimized = true
    }

    return (
        <>
            {props.alt.startsWith('banner') ? (
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    placeholder={placeholder ? 'blur' : 'empty'}
                    {...(props as ImageProps)}
                />
            ) : (props.alt.startsWith('photo') || props.alt.startsWith('screenshot')) ? (
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 15vw"
                    placeholder={placeholder ? 'blur' : 'empty'}
                    {...(props as ImageProps)}
                />
            ) : (props.alt.startsWith('meme')) ? (
                // @ts-expect-error: because the library definition is wrong
                <a href={props.src?.src} target="_blank">
                    <Image
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 15vw"
                        placeholder={placeholder ? 'blur' : 'empty'}
                        {...(props as ImageProps)}
                    />
                </a>
            ) : (
                <Image
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                    }}
                    placeholder={placeholder ? 'blur' : 'empty'}
                    {...(props as ImageProps)}
                />
            )}
        </>
    )
}

export default BaseImage