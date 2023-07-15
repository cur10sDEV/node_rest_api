import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Editor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialFormText = {
    title: "",
    content: "",
  };
  const [formText, setformText] = useState(initialFormText);
  const [fileData, setFileData] = useState("");
  const { title, content } = formText;
  const [isAllowedToSubmit, setIsAllowedToSubmit] = useState(false);

  useEffect(() => {
    async function getPostData() {
      const res = await fetch(`http://localhost:3000/admin/posts/post/${id}`);
      const data = await res.json();
      setformText(data.post);
    }
    if (id) {
      getPostData();
      setIsAllowedToSubmit(true);
    }
  }, []);

  const handleTextChange = (e) => {
    const { value, name } = e.target;
    setformText((prevValue) => {
      return { ...prevValue, [name]: value };
    });
    title.length > 5 && content.length > 100
      ? setIsAllowedToSubmit(true)
      : setIsAllowedToSubmit(false);
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFileData(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postFormData = new FormData();
    postFormData.append("title", title);
    postFormData.append("content", content);
    postFormData.append("imgUrl", fileData);
    const uri = id
      ? `http://localhost:3000/admin/posts/edit/${id}`
      : "http://localhost:3000/admin/posts/create";
    const method = id ? "PUT" : "POST";
    const res = await fetch(uri, {
      method: method,
      body: postFormData,
    });
    const data = await res.json();
    data?.msg && console.log(data.msg);
    navigate("/admin");
  };

  return (
    <form className="post_editor" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={handleTextChange}
      />
      <label htmlFor="imgUrl">Cover Image</label>
      <input
        type="file"
        name="imgUrl"
        id="imgUrl"
        onChange={handleFileChange}
      />
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        id="content"
        cols="70"
        rows="20"
        value={content}
        onChange={handleTextChange}
      ></textarea>
      <button className="btn" disabled={!isAllowedToSubmit} type="submit">
        {id ? "Update" : "Publish"}
      </button>
    </form>
  );
};
export default Editor;
