import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import SigninPage from "./pages/SigninPage";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import CreateListingPage from "./pages/CreateListingPage";
import UpdateListingPage from "./pages/UpdateListingPage";
import ListingPage from "./pages/ListingPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/sign-in", element: <SigninPage /> },
        { path: "/sign-up", element: <SignUpPage /> },
        {
          element: <PrivateRoute />,
          children: [
            { path: "/profile", element: <ProfilePage /> },
            { path: "/create-listing", element: <CreateListingPage /> },
            {
              path: "/update-listing/:listingId",
              element: <UpdateListingPage />,
            },
          ],
        },
        { path: "/listing/:listingId", element: <ListingPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
