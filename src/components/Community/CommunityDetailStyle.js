import styled from "styled-components";

export const ArticleDetail = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 1rem;
`;

export const Contents = styled.div`
  border: 1px solid black;
  height: 70vh;
`;

export const CommunityName = styled.h1`
  margin: 1.5rem 0;
  font-size: 1.5rem;
`;

export const InfoCommunity = styled.p`
  font-weight: 700;
  font-size: 1.2rem;
  width: 80%;
`;

export const DateCommunity = styled.div``;
export const NickName = styled.h3`
  font-size: 2rem;
  color: #112;
`;

export const ChatBtn = styled.button`
  border: none;
  border-radius: 50px;
  background-color: #a86eea;
  width: 18em;
  height: 3em;
  color: white;
  font-size: 1.6rem;
`;
