import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { getToken } from "../../tokenUtils";
import { BoardListBox } from "../../components/boards/BoardStyle";
import { useNavigate } from "react-router-dom";
import PostCount from "../../components/post/PostCount";
import Pager from "../../components/Common/Pager/Pager";

const BoardListPage = () => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = React.useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = React.useState(1); //현재페이지
  const [postPerPage] = React.useState(5); //페이지당 아이템 개수

  const [indexOfLastPost, setIndexOfLastPost] = React.useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(0);
  const [currentPosts, setCurrentPosts] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/v1/post", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setPosts(response.data);
        setCount(response.data.length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, posts, postPerPage]);

  const setPage = (selectedPage) => {
    setCurrentpage(selectedPage);
  };
  const increasePostCount = async (postId) => {
    try {
      await axios.get(`/api/v1/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    } catch (error) {
      console.error("증가안됌", error);
    }
  };

  const handlePostClick = async (postId) => {
    increasePostCount(postId);
    // 게시글 조회 후 필요한 로직을 추가할 수 있습니다.
  };
  return (
    <section>
      <h1>게시글 목록</h1>
      <Link to="/api/v1/post">새 게시글 작성</Link>

      <ul>
        {currentPosts.map((post) => (
          <li
            key={post.id}
            onClick={() =>
              navigate(`/api/v1/post/${post.id}`, { state: { post } })
            }
          >
            <BoardListBox>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {/* <h3>{post.member.nickName}</h3>    */}
              <PostCount
                postId={post.id}
                onClick={() => handlePostClick(post.id)}
              />
            </BoardListBox>
          </li>
        ))}
      </ul>

      <Pager page={currentpage} count={count} setPage={setPage} />
    </section>
  );
};
export default BoardListPage;
