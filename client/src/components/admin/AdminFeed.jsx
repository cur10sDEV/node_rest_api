import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminPostCard from "./AdminPostCard";

const AdminFeed = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchData = async (page) => {
    const res = await fetch(`http://localhost:3000/admin/posts?page=${page}`);
    const data = await res.json();
    setPosts(data.posts);
    setHasNextPage(data.hasNextPage);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const loadNextPage = () => {
    hasNextPage && setCurrentPage((prevValue) => prevValue + 1);
  };

  const loadPrevPage = () => {
    currentPage > 1 && setCurrentPage((prevValue) => prevValue - 1);
  };

  return (
    <>
      <div className="feed_posts">
        {posts.length !== 0 &&
          posts?.map((post) => {
            return (
              <AdminPostCard
                key={post._id.toString()}
                post={post}
                updatePosts={setPosts}
              />
            );
          })}
      </div>
      <div className="pagination">
        <button className="btn" onClick={loadPrevPage}>
          Prev
        </button>
        <button className="btn">{currentPage ? currentPage : 1}</button>
        <button className="btn" onClick={loadNextPage}>
          Next
        </button>
      </div>
      {posts.length === 0 && <h1>Sorry! No Posts found.</h1>}
    </>
  );
};
export default AdminFeed;
