import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import SigninPage from "./pages/SigninPage";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/sign-in", element: <SigninPage /> },
        { path: "/sign-up", element: <SignUpPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
