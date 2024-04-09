import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";

const BlogPage = async () => {
  // FETCH DATA WITH AN API
  const res = await fetch(`${process.env.DOMAIN}/api/blog`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const posts = await res.json();

  // FETCH DATA WITHOUT AN API
  // const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} key={post.id} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;