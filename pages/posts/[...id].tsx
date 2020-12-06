import { GetStaticProps, GetStaticPaths } from 'next'
import { Post } from '../../interfaces'
import { getAllPostIds, getPostData } from '../../lib/post'

const PostDetail = (data: Post) => {
  return (
    <>
      <h1>{data.title}</h1>
      <h2>本文</h2>
      <div className="foo" dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
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