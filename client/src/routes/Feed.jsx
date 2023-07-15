import { Route, Routes } from "react-router-dom";
import Post from "../components/feed/Post";
import Feed from "../components/feed/Feed";

const FeedRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Feed />} />
        <Route path="post/:id" element={<Post />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  );
};
export default FeedRoutes;
