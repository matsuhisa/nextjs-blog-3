import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
const highlight = require('remark-highlight.js')

const postsDirectory: string = path.join(process.cwd(), 'posts')

export const getAllPostIds = () => {
  const fileNames = (dir: string, files: Array<String> = []) => {
    const dirents = fs.readdirSync(dir, { withFileTypes: true })
    const dirs = []
    for (const dirent of dirents) {
      if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`)
      if (dirent.isFile())
        files.push(`${dir}/${dirent.name}`.replace(path.join(process.cwd(), 'posts/'), ''))
    }
    for (const d of dirs) {
      files = fileNames(d, files)
    }
    return files
  }

  return fileNames(postsDirectory).map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '').split('/'),
      },
    }
  })
}

export const getPostData = async (id: string[]) => {
  const fullPath = path.join(postsDirectory, `${id.join('/')}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(gfm)
    .use(highlight)
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}
