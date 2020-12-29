import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { Post } from '../../../../interfaces'
import { getAllYearMonths, getPostsData, getYearMonthPostIds } from '../../../../lib/post'

type monthYearProps = {
  year: string,
  month: string,
  posts: Post[],
}

const MonthIndex = (data: monthYearProps) => {
  return(
    <>
      <h1>{data.year}年{data.month}月別</h1>
      <dl>
        {data.posts.map((post: Post) => (
          <>
            <dt>{post.date}</dt>
            <dd>
              <Link href={`/posts/${post.id.join('/')}`}>{post.title}</Link>
            </dd>
          </>
        ))}
      </dl>
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
  if(params?.year != undefined && params?.month != undefined && typeof(params.month) === 'string' && typeof(params.year) === 'string' ) {
    const year: string = params.year.toString()
    const month: string = params.month.toString()
    const postIds = getYearMonthPostIds(year, month)
    const posts = await getPostsData(postIds)

    const data = {
      year: year,
      month: month,
      posts: posts,
    }
    return { props: data }
  } else {
    return { props: {} }
  }
  // try {
  //   const year: string = params?.year.toString()
  //   const month: string = params?.month.toString()
  //   const postIds = getYearMonthPostIds(year, month)
  //   const posts = await getPostsData(postIds)

  //   const data = {
  //     year: year,
  //     month: month,
  //     posts: posts,
  //   }
  //   return { props: data }
  // } catch (error) {
  //   return { props: { errors: error.message } }
  // }
  // const postIds = getYearMonthPostIds(params.year, params.month)
  // let posts: Post[] = await getPostsData(postIds)

  // const data = {
  //   year: params?.year,
  //   month: params?.month,
  //   posts: posts,
  // }
  // return { props: data }
}