import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import { useEffect,useCallback} from "react";  // useEffectをインポート
import { RecoilRoot, useSetRecoilState } from "recoil";

//全画面でdefaultのstyleを適用
import theme from "./theme/theme";
import {Router} from "./router/Router";
import { useLoginAuth } from "./hooks/useLoginAuth";  // useLoginAuthをインポート
import { loginUserState } from "./provider/LoginUserProvider";






function App() {

  return (
    <RecoilRoot>  {/* RecoilRootでアプリケーション全体をラップ */}
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <RouterWithInitialization />
      </BrowserRouter>
    </ChakraProvider>
    </RecoilRoot>
  );
}

const RouterWithInitialization = () => {
  const setLoginUser = useSetRecoilState(loginUserState);

  const initializeUser = useCallback(() => {
    const storedUser = localStorage.getItem("loginUser");
    if (storedUser) {
      setLoginUser(JSON.parse(storedUser));
    }
  }, [setLoginUser]);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return <Router />;
};

export default App;
