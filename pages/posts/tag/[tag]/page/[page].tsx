import Head from "next/head";
import {
  getAllPosts,
  getPostsForTopPage,
  getPostsByPage,
  getNumberOfPages,
  getPostsByTagAndPage,
  getNumberOfPagesByTag,
  getAllTags,
} from "../../../../../lib/notionAPI";
import SinglePost from "../../../../../components/Post/SinglePost";
import Pagination from "@/components/Pagination/Pagination";
import Tag from "@/components/Tag/Tag";

export const getStaticPaths = async () => {
  const allTags = await getAllTags("");
  let params: { params: { tag: string; page: string } }[] = [];

  await Promise.all(
  allTags.map((tag: string) => {
    return getNumberOfPagesByTag(tag).then((numberOfPagesByTag: number) => {
      for (let i = 1; i <= numberOfPagesByTag; i++) {
        params.push({ params: { tag: tag, page: i.toString() } });
      }
    });
  })
  );



  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: any) => {
  try {
    const currentPage: string = context.params?.page;
    const currentTag: string = context.params?.tag.toString();

    const upperCaseCurrentTag =
      currentTag.charAt(0).toUpperCase() + currentTag.slice(1);

    const posts = await getPostsByTagAndPage(
      upperCaseCurrentTag,
      parseInt(currentPage, 10)
    );

    const numberOfPagesByTag = await getNumberOfPagesByTag(upperCaseCurrentTag);
    const allTags = await getAllTags("");

    return {
      props: {
        posts,
        numberOfPagesByTag,
        currentTag,
        allTags,
      },
      revalidate: 10,
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

const BlogTagPageList = ({
  numberOfPagesByTag,
  posts,
  currentTag,
  allTags,
}: {
  posts: any[];
  numberOfPagesByTag: number;
  currentTag: string;
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
          {posts.map((post: any, index: number) => (
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
        <Pagination numberOfPage={numberOfPagesByTag} tag={currentTag} />
        <Tag allTags={allTags} />
      </main>
    </div>
  );
};

export default BlogTagPageList;
[];
