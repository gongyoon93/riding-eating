import { Route, Routes } from "react-router-dom";
import useSetUserState from "@/hooks/useSetUserState";
import ProtectRouter from "./ProetectRouter";
import Layout from "@/layouts/Layout";
import Map from "@/pages/Map";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import SignOut from "@/pages/SignOut";
import PageNotFound from "@/pages/PageNotFound";

// 30Line auth 앞에 '/' 없어도 상위경로 path가 auth이고 하위경로 path가 signin인 경우
// url에 /auth/signin 이동시 SignIn 컴포넌트를 렌더링함
const Routers = () => {
  const {
    userStateValue: { isLogin },
  } = useSetUserState();
  return (
    <Routes>
      <Route path="/" element={<Layout isLogin={isLogin} />}>
        <Route
          element={
            <ProtectRouter isAllow={isLogin} redirectPath={"/auth/signin"} />
          }
        >
          <Route path="" element={<Map />}></Route>
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
      <Route path="/signout" element={<SignOut />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;
