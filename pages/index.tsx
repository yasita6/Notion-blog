import Head from "next/head";
import { getAllPosts } from "../lib/notionAPI";
import SinglePost from "@/components/Post/SinglePost";

export const getStaticProps = async () => {
  try {
    const allPosts = await getAllPosts() || [];
    return {
      props: {
        allPosts,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("データ取得エラー:", error);
    return {
      props: {
        allPosts: [],
      },
    };
  }
}

export default function Home({ allPosts }: { allPosts: any[] }) {

  console.log(allPosts);
  return (
    <div className="container mx-auto">
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Notionを使ってブログを作成します" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Notion Blog🚀</h1>
        {allPosts.map((post: any, index: number) =>(
          <div key={`${post.slug}-${index}`}>
            <SinglePost 
            title={post.title} 
            description={post.description} 
            date={post.date} 
            tags={post.tags} 
            slug={post.slug}
            />
          </div>
        ))}
      </main>
    </div>
  )
}