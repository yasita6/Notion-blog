import Head from "next/head";
import { getAllPosts } from "../lib/notionAPI";

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();

  return {
    props:{
      allPosts,
    },
    revalidate: 60,
  };

}

export default function Home(allPosts: any) {
  console.log(allPosts);
  return (
    <div>
      <Head>
        <title>Notion Blog</title>
        <meta name="description" content="Notionを使ってブログを作成します" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}