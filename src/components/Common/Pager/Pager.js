import React from "react";
import Pagination from "react-js-pagination";
import { PaginationBox } from "./PagerStyle";

const Pager = ({ page, count, setPage }) => {
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };
  return (
    <PaginationBox>
      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText="<"
        nextPageText=">"
        onChange={handlePageChange}
      ></Pagination>
    </PaginationBox>
  );
};

export default Pager;
// js ts X ===> compile ts -=> js es5
// const let var
// class
//

// class Person {
//   constructor(name) {
//     this.name = name;
//   }
// }

// const Container = () => {};

// function Person(name) {
//   this.name = name;
// }

// html -> css/scss/(sass)/js versioned css + responsive design -> js es5/es6+ (2015+)
// (es5 를 꼭 공부해야함)
// migraton from old version of webiset to newer verison
//  -> react.js ->
// js typeScript
// react + NEXT.JS   server side rendering + seo
// 85+/100
//
// -----------------------------------------------------------
// node.js node.js java C python php -> backen  node.js 프론트엔드 하는 node.js
// 2010 node.js lnauge package ---> server coding // 중소 -> node , 대기 -> java
// front  back

// testing QA jest enzyme react-test

// 호주기준 인터넷강의 하는사이트 google  web development online course
// 풀패키지 -> 개별강의 ->프젝 ->개별강의
