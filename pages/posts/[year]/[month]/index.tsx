import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { getAllYearMonths, getPostsData, getYearMonthPostIds } from '../../../../lib/post'

type monthYearProps = {
  year: string,
  month: string,
  posts?: Post[],
}

const MonthIndex = (data: monthYearProps) => {
  return(
    <>
      <h1>{data.year}年{data.month}月別</h1>
      <ul>
        {data.posts.map((post: Post) => (
          <li>
            <Link href={`/posts/${post.id.join('/')}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
export default MonthIndex

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllYearMonths()
  return {
    paths, fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postIds = getYearMonthPostIds(params.year, params.month)
  let posts: Post[] = await getPostsData(postIds)

  const data = {
    year: params?.year,
    month: params?.month,
    posts: posts,
  }
  return { props: data }
}