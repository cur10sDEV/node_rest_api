import "./App.css";
import Navbar from "./components/Navbar";
import AdminRoutes from "./routes/Admin";
import FeedRoutes from "./routes/Feed";
import AuthRoutes from "./routes/Auth";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <section className="container">
          <Routes>
            <Route path="/*" element={<FeedRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </section>
      </AuthProvider>
    </>
  );
}

export default App;
