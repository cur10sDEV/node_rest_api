import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

const Post = () => {
  const initialPost = {
    title: "",
    content: "",
    createdAt: "",
    author: { name: "" },
  };
  const [post, setPost] = useState(initialPost);
  const [error, setError] = useState({ status: true, msg: "" });
  const { title, content, createdAt, author, imgUrl } = post;
  const { id } = useParams();
  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`http://localhost:3000/feed/posts/${id}`);
      const data = await res.json();
      data?.msg && console.log(data.msg);
      if (data.post) {
        setPost(data.post);
        setError({ status: false, msg: "" });
      } else {
        setError({ status: true, msg: data.msg });
      }
    }
    fetchPost();
  }, []);
  return (
    <>
      {!error.status ? (
        <>
          <img
            className="blog_post_img"
            src={`http://localhost:3000/${imgUrl}`}
            alt=""
          />
          <div className="blog_post">
            <hr size="5px" />
            <h2 className="blog_post_title">{title}</h2>
            <div className="blog_post_info">
              <p>
                created by
                <span className="blog_post_info_author"> {author.name}</span>
              </p>
              <p className="blog_post_info_date">
                {moment(createdAt).format("ll")}
              </p>
            </div>
            <p className="blog_post_content">{content}</p>
          </div>
        </>
      ) : (
        <h1 className="error_msg">{error.msg}</h1>
      )}
    </>
  );
};
export default Post;
