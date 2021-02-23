import Head from 'next/head'
import MainLayout from "../layouts";
import styles from '../styles/Home.module.scss'
import Article from '../components/article'

export default function Home({props}) {
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>

      <div className={styles.main}>
        <Article title="headlines" articles={props.topArticles} />
    </div>
    </MainLayout>
  )
}

export const getStaticProps = async () => {
  const pageSize = 10;
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=df301d89f4a647a485202b317c864ad4`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;

  return {
    props: {
      props: {
        topArticles,
      },
      revalidate: 60 * 10,
    }
  }
}
