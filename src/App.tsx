import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUpPage from "./pages/Signup";
import SignInPage from "./pages/Signin";
import DashboardPage from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<DashboardPage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        <Route path={"/signin"} element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
