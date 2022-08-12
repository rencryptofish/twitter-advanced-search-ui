import Head from 'next/head'
import SearchForm from '../components/search'


export default function Home() {
  console.log('Home')
  return (
    <div>
      <Head>
        <title>Twitter Advanced Search</title>
        <meta name="description" content="Alternative frontend for Twitter Advanced Search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Twitter Advanced Search</h1>

      <SearchForm></SearchForm>

    </div>
  )
}
