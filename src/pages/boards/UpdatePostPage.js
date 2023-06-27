import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../tokenUtils";

const UpdatePostPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    post: { title, content, postId },
  } = location.state;

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);

  const changeTitle = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const changeContent = (e) => {
    setUpdatedContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postUpdateRequest = {
        id: postId,
        title: updatedTitle,
        content: updatedContent,
      };

      const response = await axios.put(
        `/api/v1/post/${postId}`,
        postUpdateRequest,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      console.log(response.data);
      navigate(`/api/v1/post/list`);
      // navigate(`/api/v1/boards/${post.id}`);
    } catch (error) {
      console.error(error);
      alert("update실패");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={updatedTitle}
          onChange={changeTitle}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          id="content"
          rows="5"
          value={updatedContent}
          onChange={changeContent}
        ></textarea>
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdatePostPage;
