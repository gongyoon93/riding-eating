import { BrowserRouter } from "react-router-dom";

import useSetUserState from "./hooks/useSetUserState";
import { useRecoilState } from "recoil";
import { snackbarState } from "./atoms/snackbar";
import { useEffect } from "react";
import Routers from "./routes/Routers";
import Snackbar from "./components/Snackbar/Snackbar";

function App() {
  const { setUserState } = useSetUserState();
  const [snackbarQueue, setSnackbarQueue] = useRecoilState(snackbarState);

  useEffect(() => {
    const isUser = localStorage.getItem("accessState");

    if (isUser) {
      const { isLogin, uid, email, name } = JSON.parse(isUser);
      setUserState({ isLogin, uid, email, name });
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => setSnackbarQueue([]), 6000);
    return () => clearTimeout(timer);
  }, [snackbarQueue]);

  return (
    <>
      <Snackbar>
        {snackbarQueue.map(({ id, message, type }) => (
          <Snackbar.Item key={id} data-set={id} message={message} type={type} />
        ))}
      </Snackbar>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </>
  );
}

export default App;
