import {memo,VFC} from "react";
import {Route,Switch} from "react-router-dom";
import {HeaderLayout} from "../components/templates/HeaderLayout";
import {Box} from "@chakra-ui/react";
// import { LoginUserProvider } from "../provider/LoginUserProvider";

import {Home} from "../components/page/Home";
import {FriendList} from "../components/page/FriendList"
import {FriendSearch} from "../components/page/FriendSearch"
import {Profile} from "../components/page/Profile"
import {LogAdd} from "../components/page/LogAdd"
import {DivingSpots} from "../components/page/DivingSpots"
import { FishList } from "../components/page/FishList";
import {Login} from "../components/page/Login";
import {AccountAdd} from "../components/page/AccountAdd";
import { ShowMyLogInfo } from "../components/page/ShowMyLogInfo";


export const Router: VFC = memo(() => {
    return (
        <Switch>
            {/* <LoginUserProvider> */}
            {/* ログイン画面 */}
            <Route exact path="/">
                <Login/>
            </Route>

            {/* アカウント登録画面 */}
            <Route exact path="/accountAdd"> 
                <AccountAdd/>
            </Route>


            {/* ホーム画面 */}
            <Route exact path="/home">
                <HeaderLayout>
                    <Home/>
                </HeaderLayout>
            </Route>

            <Route
                path="/profile"
                render={({ match:{ url}}) => (
                <Switch>
                    {/* プロフィール画面 */}
                    <Route exact path={url}>
                        <HeaderLayout>
                            <Profile/>
                        </HeaderLayout>
                    </Route>

                    {/* 過去のログ一覧画面 */}
                    <Route exact path={`${url}/mylog`}>
                        <HeaderLayout>
                            <ShowMyLogInfo/>
                        </HeaderLayout>
                    </Route>
                </Switch>

                )}
            /> 

            {/* フレンドリスト画面 */}
            <Route exact path="/friendList"> 
                <HeaderLayout>
                    <FriendList/>
                </HeaderLayout>
            </Route>

            {/* フレンド検索画面 */}
            <Route exact path="/friendSearch"> 
                <HeaderLayout>
                    <FriendSearch/>
                </HeaderLayout>
            </Route>

            {/* ログ登録画面 */}
            <Route exact path="/logAdd">
                <HeaderLayout>
                    <LogAdd/>
                </HeaderLayout>
            </Route>

            {/* ダイビングスポット画面 */}
            <Route exact path="/divingSpots"> 
                <HeaderLayout>
                    <DivingSpots/>
                </HeaderLayout>
            </Route>

            {/* お魚一覧 */}
            <Route exact path="/fishList"> 
                <HeaderLayout>
                    <FishList/>
                </HeaderLayout>
            </Route>
            {/* </LoginUserProvider> */}


            




        </Switch>
    );
});