import { GetStaticProps, GetStaticPaths } from 'next'
import { Post } from '../../interfaces'
import { getAllPostIds, getPostData } from '../../lib/post'

const PostDetail = (data: Post) => {
  return (
    <>
      {data.title}
    </>
  )
}
export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths, fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data: Post = await getPostData(params?.id)
  return { props: data }
}