import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { getPosts } from "@lib/data";

const BlogPage = async () => {

  const posts = await getPosts();
  console.log(posts);

  return (
    <div className={styles.container}>
      {/* {posts.map((post: any) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))} */}
    </div>
  );
};

export default BlogPage;