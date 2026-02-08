import rehypeSanitize from 'rehype-sanitize'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

const file = await unified()
	.use(remarkParse)
	.use(remarkFrontmatter)
	.use(remarkRehype)
	.use(rehypeSanitize)
	.use(rehypeStringify)
	.process('# Hello, Neptune!')

console.log(String(file))
