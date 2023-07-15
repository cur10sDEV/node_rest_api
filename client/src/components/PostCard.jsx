import moment from "moment";

const PostCard = ({ post }) => {
  const { _id, title, content, imgUrl, createdAt, author } = post;
  const postBody =
    content.length > 100 ? content.substring(0, 99) + "..." : content;
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
      </div>
    </div>
  );
};
export default PostCard;
