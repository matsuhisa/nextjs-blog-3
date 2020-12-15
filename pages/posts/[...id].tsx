import { GetStaticProps, GetStaticPaths } from 'next'
import Title from '../../components/a/Title'
import { Post } from '../../interfaces'
import { getAllPostIds, getPostData } from '../../lib/post'

const PostDetail = (data: Post) => {
  return (
    <>
      <Title></Title>
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
  let data = {}
  if(params?.id != undefined && typeof(params?.id) !== 'string'){
    data = await getPostData(params?.id)
  }
  return { props: data }
}