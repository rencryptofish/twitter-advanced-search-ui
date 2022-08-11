import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Advanced Search</title>
        <meta name="description" content="Alternative frontend for Twitter Advanced Search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <footer className={styles.footer}>
        <a
          href="https://twitter.com/0xren_cf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by 0xrencf{' '}
        </a>
      </footer>
    </div>
  )
}
