import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../../tokenUtils';

export const getCommentList = createAsyncThunk('comments/fetchComments', async (postId) => {
    const response = await axios.get(`/api/v1/comments/post/${postId}`);
    return response.data;
  });
  
export const createComment = createAsyncThunk('comments/createComment', async ({ postId, content }) => {
    const token = getToken(); 
  
    const response = await axios.post('/api/v1/comments', {
      postId,
      content,
    }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
    });
    return response.data;
  });

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId) => {
  const token = getToken();
  const response = await axios.delete(`/api/v1/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return commentId;
});
      
export const updateComment = createAsyncThunk('comments/updateComment', async ({ commentId, content }) => {
  const response = await axios.put(`/api/v1/comments/${commentId}`, {
    content,
  });
  return response.data;
});

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentList.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        console.log(action.meta.arg); 
        return state.filter(comment => comment.id !== action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const { id, content } = action.payload;
        return state.map(comment => {
          if (comment.id === id) {
            return { ...comment, content };
          } else {
            return comment;
          }
        });
      });
  },
});    
export default commentSlice.reducer;


//리덕스 적용하고싶은부분
//로그인 -> 댓글 -> 대댓글 (수정삭제 등등)
// 커뮤니티 게시판 -> 댓글 대댓글 좋아요 해당 컨테츠  TODO 
//웹소켓 -> 노드js