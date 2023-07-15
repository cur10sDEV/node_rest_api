import { Routes, Route } from "react-router-dom";
import AdminFeed from "../components/admin/AdminFeed";
import Editor from "../components/admin/Editor";
import Post from "../components/admin/Post";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<AdminFeed />} />
        <Route path="post">
          <Route path="preview/:id" element={<Post />} />
          <Route path="create" element={<Editor />} />
          <Route path="edit/:id" element={<Editor />} />
        </Route>
      </Route>
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};

export default AdminRoutes;
