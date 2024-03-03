import { Route, Routes } from "react-router-dom";
import useSetUserState from "@/hooks/useSetUserState";
import ProtectRouter from "./ProetectRouter";
import Layout from "@/layouts/Layout";
import Dashboard from "@/pages/DashBoard";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

const Routers = () => {
  const {
    userStateValue: { isLogin },
  } = useSetUserState();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          element={
            <ProtectRouter isAllow={isLogin} redirectPath={"/auth/signin"} />
          }
        >
          <Route path="" element={<Dashboard />}></Route>
        </Route>
        <Route
          element={<ProtectRouter isAllow={!isLogin} redirectPath={"/"} />}
        >
          <Route path="auth">
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Route>
      </Route>
      {/* <Route path="/logout" element={<Logout />} /> */}
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
};

export default Routers;
