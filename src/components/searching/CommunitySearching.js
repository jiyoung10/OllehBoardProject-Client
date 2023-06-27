import {
  Btn,
  BtnContainer,
  BtnSpan,
} from "../Community/CommunitySearchingStyle";

export default function CommunitySearching({
  communityList,
  setSortedCommunities,
}) {
  //최신 순 정렬
  const handleSortByLatest = () => {
    const sortedCommunities = [...communityList].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setSortedCommunities(sortedCommunities);
  };

  //좋아요 순 정렬
  const handleSortByOlleh = () => {
    const sortedCommunities = [...communityList].sort(
      (a, b) => b.ollehCount - a.ollehCount
    );
    setSortedCommunities(sortedCommunities);
  };

  return (
    <BtnContainer>
      <Btn onClick={handleSortByLatest}>최신순</Btn>
      <Btn onClick={handleSortByOlleh}>좋아요순</Btn>
    </BtnContainer>
  );
}
