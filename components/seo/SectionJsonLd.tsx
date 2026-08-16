import JsonLd from '@/components/seo/JsonLd'
import { sectionGraph, type ISectionPage } from '@/shared/json-ld'

const SectionJsonLd: React.FC<ISectionPage> = (props) => {

    return <JsonLd graph={sectionGraph(props)} />

}

export default SectionJsonLd
