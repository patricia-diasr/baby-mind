import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "../views/Home";
import Form from "../views/Form";
import Settings from "../views/Settings";
import Dashboard from "../views/Dashboard";
import SignUp from "../views/Signup";
import SignIn from "../views/Signin";
import Protected from "./protected";
import {
  handleVerificationProtected,
  isAuthenticated,
} from "../services/authentication";
import { Outlet } from "react-router-dom";
import { Header } from "../components";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Protected />}>
          <Route
            index
            element={<Home />}
            loader={() => handleVerificationProtected()}
          />
        </Route>
        <Route path="/settings" element={<Protected />}>
          <Route
            index
            element={<Settings />}
            loader={() => handleVerificationProtected()}
          />
        </Route>
        <Route path="/dashboard" element={<Protected />}>
          <Route
            index
            element={<Dashboard />}
            loader={() => handleVerificationProtected()}
          />
        </Route>
        <Route
          path="new/:type"
          element={<Form />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path=":type/:id"
          element={<Form />}
          loader={() => handleVerificationProtected()}
        />
      </Route>

      <Route
        path="/signin"
        element={<SignIn />}
        loader={() => isAuthenticated()}
      />
      <Route
        path="/signup"
        element={<SignUp />}
        loader={() => isAuthenticated()}
      />
    </>
  )
);

const Index = () => {
  return <RouterProvider router={router} />;
};

export default Index;
