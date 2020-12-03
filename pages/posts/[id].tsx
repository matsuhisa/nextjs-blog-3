import { GetStaticProps, GetStaticPaths } from 'next'

const PostDetail = ({ params }) => {
  console.table(params)
  return (
    <>
      {params.id}
    </>
  )
}
export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for id => 利用可能なidを返す
  // getStaticPaths() は返す形式が決まっている
  const paths = [
    {
      params: {
        id: '100'
      }
    },
  ]
  // const paths = getAllPostIds()
  return {
    paths, fallback: false
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: { params }
  }
}
// export async function getStaticProps(params) {
//   // Fetch necessary data for the blog post using params.id
//   // params.id を利用して blog のデーターを取得する

//   return {
//     props: {
//       ...params
//     }
//   }
// }

