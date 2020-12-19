import { GetStaticProps, GetStaticPaths } from 'next'

const ArticleDetail = () => {
  return (
    <>
    </>
  )
}

export default ArticleDetail

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("------>")
  const paths = [
    {
      params: {
        year: "2020",
        month: "12",
        id: "bar",
      }
    }
  ]

  return {
    paths, fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.table(params)
  const data = {}
  return { props: data }
}