import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
const highlight = require('remark-highlight.js')

const postsDirectory: string = path.join(process.cwd(), 'posts')

// export const getYearMonthPath = (year: string, month: string) => {
//   try {
//     fs.accessSync(`${postsDirectory}/${year}/${month}`)
//     return {
//       params: {
//         year: year,
//         month: month,
//       },
//     }
//   } catch (error) {
//     return null
//   }
// }

export const getAllPostIds = () => {
  const fileNames = (dir: string, files: Array<String> = []) => {
    const dirents = fs.readdirSync(dir, { withFileTypes: true })
    const dirs = []
    for (const dirent of dirents) {
      if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`)
      if (dirent.isFile()) files.push(`${dir}/${dirent.name}`.replace(path.join(process.cwd(), 'posts/'), ''))
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

export const getAllYearMonths = () => {
  const directories: { params: { year: string; month: string } }[] = []
  const postDirectories = (directory: string) => {
    const readDirectories = fs.readdirSync(directory, { withFileTypes: true })
    readDirectories.forEach((result) => {
      if (result.isDirectory()) {
        const secondDirectories = fs.readdirSync(`${directory}/${result.name}`, { withFileTypes: true })
        secondDirectories.forEach((result2) => {
          if (result2.isDirectory()) {
            directories.push({ params: { year: result.name, month: result2.name } })
          }
        })
      }
    })
    return directories
  }
  return postDirectories(postsDirectory)
}

export const getPostData = async (id: string[] | any[]) => {
  const fullPath = path.join(postsDirectory, `${id.join('/')}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark().use(gfm).use(highlight).use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}
