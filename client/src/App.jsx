import "./App.css";
import Navbar from "./components/Navbar";
import AdminRoutes from "./routes/Admin";
import FeedRoutes from "./routes/Feed";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <section className="container">
        <Routes>
          <Route path="/*" element={<FeedRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </section>
    </>
  );
}

export default App;
