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
    const timer = setTimeout(
      () => setSnackbarQueue([]),
      6000
    ) as NodeJS.Timeout;
    return () => clearTimeout(timer);
  }, [snackbarQueue]);

  return (
    <>
      <Snackbar>
        {snackbarQueue.map(({ id, message, type }) => (
          <Snackbar.Item key={id} data-set={id} message={message} type={type} />
        ))}
      </Snackbar>
      <Routers />
    </>
  );
}

export default App;
