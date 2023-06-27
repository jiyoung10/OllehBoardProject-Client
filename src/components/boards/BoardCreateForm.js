// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { getToken, setToken } from "../../tokenUtils";

// const BoardCreateForm = () => {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "/api/v1/post",
//         {
//           title,
//           content,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${getToken()}`,
//           },
//         }
//       );
//       setTitle("");
//       setContent("");
//       // navigate('/api/v1/post/list');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Title:
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Content:
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default BoardCreateForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBoard } from "../../redux/slice/boardSlice";
import {
  BoardFormContainer,
  BoardForm,
  BoardLabel,
  BoardInput,
  BoardTextarea,
  BoardButton,
} from "../Boards/BoardStyle";

export default function BoardCreateForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createBoard({ title, content }));
      setTitle("");
      setContent("");
      navigate("/api/v1/post/list");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BoardFormContainer>
      <BoardForm onSubmit={handleSubmit}>
        <BoardLabel>
          제목
          <BoardInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요!"
            required
          />
        </BoardLabel>
        <br />
        <BoardLabel>
          본문
          <BoardTextarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </BoardLabel>
        <br />
        <BoardButton type="submit">등록</BoardButton>
      </BoardForm>
    </BoardFormContainer>
  );
}
