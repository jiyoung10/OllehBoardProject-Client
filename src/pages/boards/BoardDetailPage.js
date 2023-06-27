import React from "react";
import { useLocation, useParams } from "react-router-dom";
import BoardDetail from "../../components/boards/BoardDetail";
import CommentContainer from "../../components/Comment/CommentContainer";

export default function BoardDetailPage() {
  const {
    state: { post },
  } = useLocation();
  const { postId } = useParams();

  return (
    <div>
      <BoardDetail post={post} postId={postId} />
      <CommentContainer postId={postId} />
    </div>
  );
}
