import Head from "next/head";
import { getAllPosts } from "../lib/notionAPI";

export const getStaticProps = async () => {
<<<<<<< HEAD
  const allPosts = await getAllPosts();
=======
  const allPosts = await getAllPosts() || [];
>>>>>>> ef4c8ddad0deaabfe7f3da951f26db253d3906c9

  return {
    props:{
      allPosts,
    },
    revalidate: 60,
  };

<<<<<<< HEAD
}

export default function Home(allPosts: any) {
=======
};

export default function Home({allPosts}: any) {
>>>>>>> ef4c8ddad0deaabfe7f3da951f26db253d3906c9
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