// import React, { useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// // import { updateCommunity } from "../../redux/slice/communitySlice";
// import Olleh from "../../components/Olleh/Olleh";
// import { updateCommunity } from "../redux/slice/communitySlice";
// // import Map from "../../components/map/Map";

// export default function CommunityDetail() {
//   const { state } = useLocation();
//   const { communityId } = useParams();
//   const {
//     id,
//     info,
//     interest,
//     communityName,
//     memberNickName,
//     ollehCount,
//     region,
//     createdAt,
//   } = state.community;

//   //작성자인지 아닌지 판별
//   const nickname = useSelector((state) => state.user.nickname);
//   const isCommunityUser = nickname === memberNickName;

//   const dispatch = useDispatch();

//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedData, setUpdatedData] = useState({
//     id,
//     communityName,
//     info,
//     interest,
//     region,
//   });

//   const handleUpdate = () => {
//     dispatch(updateCommunity(updatedData))
//       .unwrap()
//       .then(() => {
//         setIsEditing(false);
//       })
//       .catch((error) => {
//         console.log("Update failed:", error);
//       });
//   };

//   const handleInputChange = (e) => {
//     setUpdatedData({
//       ...updatedData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     // 폼 취소 로직 구현
//   };

//   const navigate = useNavigate();
//   const enterChatRoom = () => {
//     navigate(`/community/${communityId}/chat-room`);
//   };

//   return (
//     <section>
//       <h1>asdfkljasdnfjkadsnfjkldsa</h1>
//       {isCommunityUser ? (
//         <div>
//           {isEditing ? (
//             <div>
//               <button onClick={handleUpdate}>저장하기</button>
//               <button onClick={handleCancel}>취소하기</button>
//             </div>
//           ) : (
//             <button onClick={handleEdit}>수정하기</button>
//           )}
//           <button>삭제하기</button>
//         </div>
//       ) : null}

//       <article>

//         <span>Member Nickname: {memberNickName}</span>
//         <h1>
//           {isEditing ? (
//             <input
//               name="communityName"
//               value={updatedData.communityName}
//               onChange={handleInputChange}
//             />
//           ) : (
//             communityName
//           )}
//         </h1>
//         <span> {new Date(createdAt).toLocaleDateString()}</span>
//         <p>
//           Info:{" "}
//           {isEditing ? (
//             <textarea
//               name="info"
//               value={updatedData.info}
//               onChange={handleInputChange}
//             />
//           ) : (
//             info
//           )}
//         </p>
//         <span>
//           Interest:{" "}
//           {isEditing ? (
//             <input
//               name="interest"
//               value={updatedData.interest}
//               onChange={handleInputChange}
//             />
//           ) : (
//             interest
//           )}
//         </span>
//         <span>
//           Region:{" "}
//           {isEditing ? (
//             <input
//               name="region"
//               value={updatedData.region}
//               onChange={handleInputChange}
//             />
//           ) : (
//             region
//           )}
//         </span>
//       </article>

//       <Olleh communityId={id} ollehCount={ollehCount} />

//       <button className="enter-chatroom-btn" onClick={enterChatRoom}>
//         채팅방 입장하기
//       </button>
//     </section>
//   );
// }

import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCommunity,
  deleteCommunity,
} from "../../pages/redux/slice/communitySlice";
import Olleh from "../../components/Olleh/Olleh";
import {
  ArticleDetail,
  ChatBtn,
  CommunityName,
  Contents,
  DateCommunity,
  InfoCommunity,
  NickName,
} from "../../components/Community/CommunityDetailStyle";
import Map from "../../components/map/Map";
// import Map from "../../components/Map/Map";

export default function CommunityDetail() {
  const { state } = useLocation();
  const {
    id,
    info,
    interest,
    communityName,
    memberNickName,
    ollehCount,
    region,
    createdAt,
  } = state.community;
  const { communityId } = useParams();
  //작성자인지 아닌지 판별
  const nickname = useSelector((state) => state.user.nickname);
  const isCommunityUser = nickname === memberNickName;

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    id,
    communityName,
    info,
    interest,
    region,
  });

  const handleUpdate = () => {
    dispatch(updateCommunity(updatedData))
      .unwrap()
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.log("Update failed:", error);
      });
  };

  const handleInputChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };

  //Edit form 생성
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Edit form 취소
  const handleCancel = () => {
    setIsEditing(false);
  };
  const navigate = useNavigate();

  const enterChatRoom = () => {
    navigate(`/community/${communityId}/chat-room`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("이 커뮤니티를 정말로 삭제하시겠습니까?")) {
      dispatch(deleteCommunity(id))
        .unwrap()
        .catch((error) => {
          console.log("Delete failed:", error);
        });
    }
  };

  return (
    <section>
      {isCommunityUser ? (
        <div>
          {isEditing ? (
            <div>
              <button onClick={handleUpdate}>저장하기</button>
              <button onClick={handleCancel}>취소하기</button>
            </div>
          ) : (
            <button onClick={handleEdit}>수정하기</button>
          )}
          <button onClick={handleDelete}>삭제하기</button>
        </div>
      ) : null}

      <ArticleDetail>
        <CommunityName>
          {isEditing ? (
            <input
              name="communityName"
              value={updatedData.communityName}
              onChange={handleInputChange}
            />
          ) : (
            communityName
          )}
        </CommunityName>

        <span>
          관심사:{" "}
          {isEditing ? (
            <input
              name="interest"
              value={updatedData.interest}
              onChange={handleInputChange}
            />
          ) : (
            interest
          )}
        </span>
        <InfoCommunity>
          소개글:{" "}
          {isEditing ? (
            <textarea
              name="info"
              value={updatedData.info}
              onChange={handleInputChange}
            />
          ) : (
            info
          )}
        </InfoCommunity>
        <span>
          지역:{" "}
          {isEditing ? (
            <input
              name="region"
              value={updatedData.region}
              onChange={handleInputChange}
            />
          ) : (
            region
          )}
        </span>
        <DateCommunity>
          {" "}
          {new Date(createdAt).toLocaleDateString()}
        </DateCommunity>

        <NickName>{memberNickName}</NickName>
      </ArticleDetail>

      <Olleh communityId={id} ollehCount={ollehCount} />
      <Map region={region} />

      <ChatBtn className="enter-chatroom-btn" onClick={enterChatRoom}>
        채팅방 입장하기
      </ChatBtn>
    </section>
  );
}
