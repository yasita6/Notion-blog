import Head from "next/head";
import { getAllPosts, getAllTags, getPostsForTopPage } from "../lib/notionAPI";
import SinglePost from "@/components/Post/SinglePost";
import Link from "next/link";
import Tag from "@/components/Tag/Tag";

export const getStaticProps = async () => {
  try {
    const fourPosts = await getPostsForTopPage(4);
    const allTags = await getAllTags("");
    return {
      props: {
        fourPosts,
        allTags,
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

export default function Home({ fourPosts, allTags }: { fourPosts: any[], allTags: any[] }) {
  // console.log(allPosts);
  return (
    <div className="container mx-auto">
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Notionを使ってブログを作成します" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion Blog🚀
        </h1>
        {fourPosts.map((post: any) => (
          <div key={post.id}>
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={false}
            />
          </div>
        ))}
        <Link
          href="/posts/page/1"
          className="mb-6 lg:w-1/2 mx-auto rounded-md block px-5 py-3 text-right"
        >
          <span className="hover:text-sky-700 duration-300">...もっと見る</span>
        </Link>
        <Tag allTags={allTags} />
      </main>
    </div>
  );
}