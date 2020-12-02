import Link from 'next/link'
import Layout from '../components/Layout'

const FooPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>Foo</h1>
    <p>This is the foo page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default FooPage