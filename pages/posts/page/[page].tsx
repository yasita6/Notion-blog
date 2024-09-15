import Head from "next/head";
import {
  getAllPosts,
  getPostsForTopPage,
  getPostsByPage,
  getNumberOfPages,
  getAllTags,
} from "../../../lib/notionAPI";
import SinglePost from "../../../components/Post/SinglePost";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import Tag from "@/components/Tag/Tag";

export const getStaticPaths = async () => {
  const numberOfPages = await getNumberOfPages();

  let params = [];
  for (let i = 1; i <= numberOfPages; i++) {
    params.push({ params: { page: i.toString() } });
  }

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: any) => {
  try {
    const currentPage = context.params?.page;
    const postsByPage = await getPostsByPage(
      parseInt(currentPage.toString(), 10)
    );
    const numberOfPages = await getNumberOfPages();
    const allTags = await getAllTags("");

    return {
      props: {
        postsByPage,
        numberOfPages,
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
};

const BlogPageList = ({
  postsByPage,
  numberOfPages,
  allTags,
}: {
  postsByPage: any[];
  numberOfPages: number;
  allTags: any[];
}) => {
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
        <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
          {postsByPage.map((post: any, index: number) => (
            <div key={post.id}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={true}
              />
            </div>
          ))}
        </section>
        <Pagination numberOfPage={numberOfPages} tag={""} />
        <Tag allTags={allTags} />
      </main>
    </div>
  );
};

export default BlogPageList;
[];
