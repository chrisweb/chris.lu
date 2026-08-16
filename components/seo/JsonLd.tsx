interface IProps {
    graph: Record<string, unknown>
}

/**
 * renders a schema.org structured data block
 *
 * a script tag with the ld+json type is a data block, it never executes and
 * is not subject to the script-src CSP directive, so no nonce is needed here
 */
const JsonLd: React.FC<IProps> = ({ graph }) => {

    return (
        <script
            type="application/ld+json"
            // the payload is JSON.stringify output with "<" escaped below, so
            // it can never break out of the script tag
            // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
            dangerouslySetInnerHTML={{
                // "<" is escaped to keep the payload from ever closing the
                // script tag early if a title or description contains markup
                __html: JSON.stringify(graph).replace(/</g, '\\u003c'),
            }}
        />
    )

}

export default JsonLd
