import Head from 'next/head'
import MainLayout from "../layouts";
import styles from '../styles/Home.module.scss';
import Article from '../components/article';
import Nav from '../components/nav';
import WeathierNews from '../components/weather-news';
import PickupArticle from '../components/pickup-article';
import WeatherNews from '../components/weather-news';

export default function Home({props}) {
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
      <div className={styles.blank} />
      <div className={styles.main}>
        <Article title="headlines" articles={props.topArticles} />
        </div>
        <div className={styles.aside}>
          <WeatherNews weatherNews={props.weatherNews} />
          <PickupArticle articles={props.pickupArticles} />
        </div>
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

  const lat = 35.4122;
  const lon = 139.4130;
  const exclude = "hourly,munutely";
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=db4e458e36523588329d5712f5aee894`
  )
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  const keyword = "software";
  const sortBy = "popularity";
  const pickupPageSize = 5;
  const pickupres = await fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&language=jp&sortBy=${sortBy}&pageSize=${pickupPageSize}&apiKey=df301d89f4a647a485202b317c864ad4`
  )
  const pickupJson = await pickupres.json();
  const pickupArticles = pickupJson?.articles;

  return {
    props: {
      props: {
        topArticles,
        weatherNews,
        pickupArticles
      },
      revalidate: 60,
    }
  }
}
