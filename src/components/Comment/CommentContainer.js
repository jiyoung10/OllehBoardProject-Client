import React, { useState, useEffect } from "react";
import { getToken } from "../../tokenUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentList,
  createComment,
} from "../../pages/redux/slice/commentSlice";
import CommentList from "./CommentList";
import {
  TextArea,
  CommentButton,
  FormContainer,
  CommentSection,
} from "./CommentStyle";

export default function CommentContainer({ postId }) {
  const [content, setContent] = useState("");
  const [commentId, setCommentId] = useState("");

  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment);

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const createCommentHandler = (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      alert("코멘트를 입력해주세요");
      return;
    }

    const token = getToken();

    if (!token) {
      alert("로그인이 필요합니다");
      return;
    }

    dispatch(createComment({ postId, content }))
      .then((response) => {
        setContent("");
        dispatch(getCommentList(postId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getCommentList(postId));
  }, [commentId]);

  return (
    <CommentSection>
      <h1>코멘트</h1>
      <ul>
        {commentList.map((comment) => (
          <li key={comment.id}>
            <CommentList
              id={comment.id}
              postId={postId}
              memberName={comment.memberName}
              content={comment.content}
            />
          </li>
        ))}
      </ul>

      <FormContainer>
        <TextArea rows="10" value={content} onChange={changeContent} required />
        <CommentButton onClick={createCommentHandler}>등록</CommentButton>
      </FormContainer>
    </CommentSection>
  );
}
