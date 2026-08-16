import JsonLd from '@/components/seo/JsonLd'
import { articleGraph, type IArticleFrontmatter } from '@/shared/json-ld'

interface IProps {
    frontmatter: IArticleFrontmatter
    image?: string
}

const ArticleJsonLd: React.FC<IProps> = ({ frontmatter, image }) => {

    return <JsonLd graph={articleGraph(frontmatter, image)} />

}

export default ArticleJsonLd
