import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllYearMonths } from '../../../../lib/post'

type monthYearProps = {
  year: string,
  month: string
}

const MonthIndex = (data: monthYearProps) => {
  return(
    <>
      <h1>{data.year}年{data.month}月別</h1>
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
  const data = {
    year: params?.year,
    month: params?.month,
  }
  return { props: data }
}