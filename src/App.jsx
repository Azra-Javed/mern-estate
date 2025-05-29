import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import SigninPage from "./pages/SigninPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },

    {
      path: "/sign-in",
      element: <SigninPage />,
    },

    {
      path: "/sign-up",
      element: <SignUpPage />,
    },

    {
      path: "/about",
      element: <AboutPage />,
    },

    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
