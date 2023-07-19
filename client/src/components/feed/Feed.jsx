import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchData = async (page) => {
    const res = await fetch(`http://localhost:3000/feed/posts?page=${page}`);
    const data = await res.json();
    if (data) {
      setPosts(data.posts);
      setHasNextPage(data.hasNextPage);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const socket = io("ws://localhost:3000");
  socket.on("posts", (data) => {
    fetchData(currentPage);
  });

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
              <Link key={post._id.toString()} to={`/post/${post._id}`}>
                <PostCard post={post} />
              </Link>
            );
          })}
      </div>
      {posts?.length > 0 && (
        <div className="pagination">
          <button className="btn" onClick={loadPrevPage}>
            Prev
          </button>
          <button className="btn">{currentPage ? currentPage : 1}</button>
          <button className="btn" onClick={loadNextPage}>
            Next
          </button>
        </div>
      )}
      {posts.length === 0 && <h1>Sorry! No Posts found.</h1>}
    </>
  );
};
export default Feed;
