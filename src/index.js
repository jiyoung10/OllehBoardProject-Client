import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import SignUpPage from "./pages/users/SignUpPage";
import LoginPage from "./pages/users/LoginPage";
import CreatePostPage from "./pages/boards/CreatePostPage";
import BoardList from "./pages/boards/BoardListPage";
import BoardDetailPage from "./pages/boards/BoardDetailPage";
import CommunityList from "./pages/community/CommunityList";
import CreateCommunity from "./pages/community/CreateCommunity";
import CommunityDetail from "./pages/community/CommunityDetail";
import { persistor, store } from "./pages/redux/store";
import UpdatePostPage from "./pages/boards/UpdatePostPage";
import ChatRoom from "./pages/chatroom/ChatRoom1";
import MyPage from "./pages/mypage/MyPage";
import MyPageEdit from "./pages/mypage/MyPageEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/api/v1/members/join", element: <SignUpPage /> },
      { path: "/api/v1/members/login", element: <LoginPage /> },
      { path: "/api/v1/post", element: <CreatePostPage /> },
      { path: "/api/v1/post/list", element: <BoardList /> },
      { path: "/api/v1/post/:postId", element: <BoardDetailPage /> },
      { path: "/api/v1/post/update", element: <UpdatePostPage /> },
      { path: "/api/v1/community", element: <CreateCommunity /> },
      { path: "/api/v1/community/list", element: <CommunityList /> },
      { path: "/api/v1/community/:communityId", element: <CommunityDetail /> },
      { path: "/api/v1/myPage", element: <MyPage /> },
      { path: "/api/v1/myPage/update", element: <MyPageEdit /> },
      { path: "/api/v1/chat", element: <ChatRoom /> },
      { path: "/community/:communityId/chat-room", element: <ChatRoom /> },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </RouterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
