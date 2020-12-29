import { GetStaticProps, GetStaticPaths } from 'next'
import { Post } from '../../../interfaces'
import { getAllYears } from '../../../lib/post'

type yearPorps = {
  year: string,
  posts: Post[],
}

const YearIndex = (data: yearPorps) => {
  return(
    <>
      <h1>{data.year}年別</h1>
    </>
  )
}
export default YearIndex

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllYears()
  return {
    paths, fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = {
    year: params?.year,
  }
  return { props: data }
}