import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const AdminPostCard = ({ post, updatePosts }) => {
  const navigate = useNavigate();
  const { _id, title, content, imgUrl, createdAt, author } = post;
  const postBody =
    content.length > 100 ? content.substring(0, 99) + "..." : content;

  const deletePost = async (e) => {
    const res = await fetch(`http://localhost:3000/admin/posts/delete/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.errors.length === 0) {
      updatePosts((prevValue) => {
        const newPosts = prevValue.filter(
          (post) => post._id.toString() !== _id.toString()
        );
        return newPosts;
      });
      navigate("/admin");
    } else {
      console.log(data.msg);
    }
  };

  return (
    <div className="post_card">
      <div className="post_card_header">
        <img
          className="post_card_img"
          src={`http://localhost:3000/${imgUrl}`}
          alt="IMG Post One"
        />
      </div>
      <div className="post_card_content">
        <h2 className="post_card_content_title">{title}</h2>
        <p className="post_card_content_body">{postBody}</p>
        <div className="post_card_content_footer">
          <p className="post_card_content_footer_author">{author.name}</p>
          <p className="post_card_content_footer_date">
            {moment(createdAt).format("ll")}
          </p>
        </div>
        <div className="post_card_content_actions">
          <Link to={`post/edit/${_id.toString()}`}>
            <button className="post_card_content_actions_button">Edit</button>
          </Link>
          <Link to={`/admin/post/preview/${_id}`}>
            <button className="post_card_content_actions_button">
              Preview
            </button>
          </Link>
          <button
            className="post_card_content_actions_button"
            onClick={deletePost}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminPostCard;
