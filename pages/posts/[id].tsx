import { GetStaticProps, GetStaticPaths } from 'next'

// type Props = {
//   title: String
//   id: number
// }

const SamplePostDetail = ({ data, foo }) => {
  console.log('------')
  console.table(data)
  console.table(foo)
  console.log('------')
  return (
    <>
      {data.title}
      {data.id}
    </>
  )
}
export default SamplePostDetail

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
  const data = {
    title: `タイトル => ${params?.id}`,
    id: Number(params?.id)
  }
  const foo = { hoge: 'foobar' }

  console.log(data)
  console.log(foo)
  return { props: { data, foo } }
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

